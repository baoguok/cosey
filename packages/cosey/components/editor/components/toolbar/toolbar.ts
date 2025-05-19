import Quill, { Parchment } from 'quill';
import { ImageUploader } from '../../modules/image-uploader/image-uploader';
import { INDENT_STEP } from '../../formats/indent';

export class Toolbar extends EventTarget {
  quill: Quill;

  static events = {
    EDITOR_CHANGE: 'editor-change',
  } as const;

  constructor(quill: Quill) {
    super();
    this.quill = quill;

    quill.on(Quill.events.EDITOR_CHANGE, () => {
      const [range] = this.quill.selection.getRange();
      const formats = range == null ? {} : this.quill.getFormat(range);

      this.emit(Toolbar.events.EDITOR_CHANGE, { formats });
    });
  }

  on(
    event: typeof Toolbar.events.EDITOR_CHANGE,
    handler: (
      event: CustomEvent<{
        formats: {
          [format: string]: unknown;
        };
      }>,
    ) => void,
  ): void;

  on(event: string, handler: (event: CustomEvent) => void) {
    this.addEventListener(event, handler as EventListener);
  }

  off(event: string, handler: (event: CustomEvent) => void) {
    this.removeEventListener(event, handler as EventListener);
  }

  emit(event: string, payload?: unknown) {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: payload,
      }),
    );
  }

  font(value: string) {
    this.quill.format('font', value, Quill.sources.USER);
  }

  size(value: string) {
    this.quill.format('size', value, Quill.sources.USER);
  }

  header(value: number | false) {
    this.quill.format('header', value, Quill.sources.USER);
  }

  align(value: 'left' | 'center' | 'right' | 'justify', isActive?: boolean) {
    this.quill.format('align', isActive ? false : value, Quill.sources.USER);
  }

  bold(value?: boolean) {
    this.quill.format('bold', value, Quill.sources.USER);
  }

  italic(value?: boolean) {
    this.quill.format('italic', value, Quill.sources.USER);
  }

  underline(value?: boolean) {
    this.quill.format('underline', value, Quill.sources.USER);
  }

  strike(value?: boolean) {
    this.quill.format('strike', value, Quill.sources.USER);
  }

  script(value: 'super' | 'sub', isActive?: boolean) {
    this.quill.format('script', isActive ? false : value, Quill.sources.USER);
  }

  indentStyle(value: string) {
    const range = this.quill.getSelection(true);
    const formats = this.quill.getFormat(range);
    const indent = parseInt((formats.indent as string) || '0', 10);
    if (value === '+1' || value === '-1') {
      const modifier = value === '+1' ? INDENT_STEP : -INDENT_STEP;
      this.quill.format('indent', indent + modifier, Quill.sources.USER);
    }
  }

  indent(value: string) {
    const range = this.quill.getSelection(true);
    const formats = this.quill.getFormat(range);
    const indent = parseInt((formats.indent as string) || '0', 10);
    if (value === '+1' || value === '-1') {
      let modifier = value === '+1' ? 1 : -1;
      if (formats.direction === 'rtl') modifier *= -1;
      this.quill.format('indent', indent + modifier, Quill.sources.USER);
    }
  }

  list(value: string) {
    const range = this.quill.getSelection(true);
    const formats = this.quill.getFormat(range);
    if (value === 'check') {
      if (formats.list === 'checked' || formats.list === 'unchecked') {
        this.quill.format('list', false, Quill.sources.USER);
      } else {
        this.quill.format('list', 'unchecked', Quill.sources.USER);
      }
    } else {
      this.quill.format('list', value, Quill.sources.USER);
    }
  }

  blockquote(value?: boolean) {
    this.quill.format('blockquote', value, Quill.sources.USER);
  }

  codeBlock(value?: boolean) {
    this.quill.format('code-block', value, Quill.sources.USER);
  }

  code(value?: boolean) {
    this.quill.format('code', value, Quill.sources.USER);
  }

  link(value: string) {
    this.quill.format('link', value, Quill.sources.USER);
  }

  image() {
    const imageUploader = this.quill.getModule('imageUploader') as ImageUploader;
    imageUploader.selectLocalImage();
  }

  formula(value: string) {
    const range = this.quill.getSelection(true);
    if (range != null) {
      const index = range.index + range.length;
      this.quill.insertEmbed(index, 'formula', value, Quill.sources.USER);
      this.quill.insertText(index + 1, ' ', Quill.sources.USER);
      this.quill.setSelection(index + 2, Quill.sources.USER);
    }
  }

  color(value: string | false) {
    this.quill.format('color', value, Quill.sources.USER);
  }

  background(value: string | false) {
    this.quill.format('background', value, Quill.sources.USER);
  }

  clean() {
    const range = this.quill.getSelection(true);
    if (range == null) return;
    if (range.length === 0) {
      const formats = this.quill.getFormat();
      Object.keys(formats).forEach((name) => {
        // Clean functionality in existing apps only clean inline formats
        if (this.quill.scroll.query(name, Parchment.Scope.INLINE) != null) {
          this.quill.format(name, false, Quill.sources.USER);
        }
      });
    } else {
      this.quill.removeFormat(range.index, range.length, Quill.sources.USER);
    }
  }
}
