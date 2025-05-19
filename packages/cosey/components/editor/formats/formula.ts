import katex from 'katex';
import Embed from 'quill/blots/embed';

export class Formula extends Embed {
  static blotName = 'formula';
  static className = 'ql-formula';
  static tagName = 'SPAN';

  static create(value: string) {
    const node = super.create(value) as HTMLElement;
    if (typeof value === 'string') {
      katex.render(value, node, {
        throwOnError: false,
        errorColor: '#f00',
        output: 'mathml',
      });
      node.setAttribute('data-value', value);
    }
    return node;
  }

  static value(domNode: Element) {
    return domNode.getAttribute('data-value');
  }

  html() {
    const { formula } = this.value();
    return `<span class="${Formula.className}" data-value="${formula}"></span>`;
  }
}
