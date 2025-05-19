import { BlockEmbed } from 'quill/blots/block';
import { Link } from './link';

const ATTRIBUTES = ['height', 'width', 'src', 'controls', 'style'];

interface VideoValue {
  url: string;
  width: string;
  height: string;
}

class Video extends BlockEmbed {
  static blotName = 'video';
  static tagName = 'VIDEO';

  static create(value: VideoValue) {
    const node = super.create(value) as Element;
    node.setAttribute('controls', 'true');
    node.setAttribute('src', this.sanitize(value.url));
    node.setAttribute('width', value.width);
    node.setAttribute('height', value.height);
    return node;
  }

  static formats(domNode: Element) {
    return ATTRIBUTES.reduce((formats: Record<string, string | null>, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static sanitize(url: string) {
    return Link.sanitize(url);
  }

  static value(domNode: Element) {
    return domNode.getAttribute('src');
  }

  format(name: string, value: string) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

export default Video;
