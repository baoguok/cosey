import Quill, { Module, Parchment } from 'quill';

import { ImageLoading } from './formats/image-loading';
import Toolbar from 'quill/modules/toolbar';
import { chooseFiles, readAsDataURL, uniqid } from '../../../../utils';

export interface ImageUploaderOptions {
  upload: (file: File) => Promise<string>;
}

const IMAGE_MIME_REGEX = /^image\/(jpe?g|gif|png|svg|webp)$/i;

export class ImageUploader extends Module<ImageUploaderOptions> {
  static DEFAULTS: ImageUploaderOptions;

  static register() {
    Quill.register(ImageLoading, true);
  }

  options: ImageUploaderOptions;

  mapFile = new WeakMap<File, Parchment.Blot | null>();

  constructor(quill: Quill, options: ImageUploaderOptions) {
    super(quill, options);

    this.quill = quill;
    this.options = options;

    if (typeof this.options.upload !== 'function')
      console.warn('[Missing config] upload function that returns a promise is required');

    const toolbar = this.quill.getModule('toolbar') as Toolbar;
    if (toolbar) {
      toolbar.addHandler('image', this.selectLocalImage);
    }

    this.quill.root.addEventListener('drop', this.handleDrop, false);
    this.quill.root.addEventListener('paste', this.handlePaste, false);
  }

  selectLocalImage = () => {
    chooseFiles({
      accept: 'image/*',
      multiple: false,
    }).then((files) => {
      files.forEach((file) => {
        this.readAndUploadFile(file);
      });
    });
  };

  handleDrop = (evt: DragEvent) => {
    if (evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length) {
      evt.stopPropagation();
      evt.preventDefault();

      if (document.caretRangeFromPoint) {
        const selection = document.getSelection();
        const range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
        if (selection && range) {
          selection.setBaseAndExtent(
            range.startContainer,
            range.startOffset,
            range.startContainer,
            range.startOffset,
          );
        }
      } else {
        const selection = document.getSelection();
        const range = document.caretPositionFromPoint(evt.clientX, evt.clientY);
        if (selection && range) {
          selection.setBaseAndExtent(
            range.offsetNode,
            range.offset,
            range.offsetNode,
            range.offset,
          );
        }
      }

      Array.from(evt.dataTransfer.files).forEach((file) => {
        if (IMAGE_MIME_REGEX.test(file.type)) {
          this.readAndUploadFile(file);
        }
      });
    }
  };

  handlePaste = (evt: ClipboardEvent) => {
    const clipboard = evt.clipboardData;

    if (clipboard && clipboard.files) {
      const files = clipboard.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (IMAGE_MIME_REGEX.test(file.type)) {
          this.readAndUploadFile(file);
        }
      }
    }
  };

  readAndUploadFile(file: File) {
    if (IMAGE_MIME_REGEX.test(file.type)) {
      this.mapFile.set(file, null);

      readAsDataURL(file).then((result) => {
        this.insertBase64Image(file, result);

        this.options
          .upload(file)
          .then((imageUrl) => {
            this.insertToEditor(file, imageUrl);
          })
          .catch(() => {
            this.removeBase64Image(file);
          });
      });
    }
  }

  insertBase64Image(file: File, url: string) {
    const range = this.quill.getSelection(true);

    const id = uniqid();

    this.quill.insertEmbed(
      range.index,
      ImageLoading.blotName,
      {
        src: `${url}`,
        id,
      },
      Quill.sources.USER,
    );
    const node = this.quill.container.querySelector(`#${id}`)!;
    const blot = Quill.find(node) as Parchment.Blot;
    this.mapFile.set(file, blot);

    range.index++;
    this.quill.setSelection(range, Quill.sources.USER);
  }

  insertToEditor(file: File, url: string) {
    const blot = this.mapFile.get(file);
    if (!blot || !blot.domNode.isConnected) {
      return;
    }

    const beforeRange = this.quill.getSelection(true);

    const index = this.removeBase64Image(file);
    this.quill.insertEmbed(index, 'image', `${url}`, Quill.sources.USER);

    if (beforeRange) {
      this.quill.setSelection(beforeRange, Quill.sources.USER);
    }
  }

  removeBase64Image(file: File) {
    const blot = this.mapFile.get(file)!;
    const index = this.quill.getIndex(blot);
    this.quill.deleteText(index, 1, Quill.sources.USER);
    return index;
  }
}
