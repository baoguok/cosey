import Embed from 'quill/blots/embed';

export class ImageLoading extends Embed {
  static blotName = 'imageLoading';
  static className = 'co-editor-image-loading';
  static tagName = 'SPAN';

  static create({ src, id }: { src: string; id: string }) {
    const node = super.create() as HTMLElement;

    node.id = id;

    const image = document.createElement('img');
    image.setAttribute('src', src as string);
    node.appendChild(image);

    const loading = this.createLoading();
    node.appendChild(loading);
    return node;
  }

  static createLoading() {
    const box = document.createElement('div');
    box.innerHTML =
      '<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none"></circle></svg>';
    return box;
  }

  deleteAt(index: number, length: number) {
    super.deleteAt(index, length);
  }

  static value(domNode: HTMLElement) {
    const { src, custom } = domNode.dataset;
    return { src, custom };
  }
}
