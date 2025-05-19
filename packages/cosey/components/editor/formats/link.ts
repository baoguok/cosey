import Inline from 'quill/blots/inline';

interface LinkValue {
  href: string | null;
  title: string | null;
  target: string | null;
}

class Link extends Inline {
  static blotName = 'link';
  static tagName = 'A';
  static SANITIZED_URL = 'about:blank';
  static PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel', 'sms'];

  static create(value: LinkValue) {
    const node = super.create(value) as HTMLElement;

    this.setAttributes(node, value);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return {
      href: domNode.getAttribute('href'),
      title: domNode.getAttribute('title'),
      target: domNode.getAttribute('target'),
    };
  }

  static sanitize(url: string) {
    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  }

  static toggleAttribute(domNode: HTMLElement, attrName: string, attrValue: any) {
    if (!attrValue) {
      domNode.removeAttribute(attrName);
    } else {
      domNode.setAttribute(attrName, attrValue);
    }
  }

  static setAttributes(domNode: HTMLElement, value: LinkValue) {
    this.toggleAttribute(domNode, 'href', value.href);
    this.toggleAttribute(domNode, 'title', value.title);
    this.toggleAttribute(domNode, 'target', value.target);
    this.toggleAttribute(domNode, 'rel', value.target === '_blank' ? 'noopener noreferrer' : '');
  }

  format(
    name: string,
    value: { href: string | null; title: string | null; target: string | null },
  ) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      Link.setAttributes(this.domNode, value);
    }
  }
}

function sanitize(url: string, protocols: string[]) {
  const anchor = document.createElement('a');
  anchor.href = url;
  const protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  return protocols.indexOf(protocol) > -1;
}

export { Link, sanitize };
