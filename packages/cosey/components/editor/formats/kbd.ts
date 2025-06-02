import Inline from 'quill/blots/inline';

class Kbd extends Inline {
  static blotName = 'kbd';
  static tagName = 'KBD';

  static create() {
    const node = super.create() as HTMLElement;
    return node;
  }
}

export default Kbd;
