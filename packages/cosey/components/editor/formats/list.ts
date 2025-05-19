import Block from 'quill/blots/block';
import Container from 'quill/blots/container';
import type Scroll from 'quill/blots/scroll';
import Quill from 'quill/core/quill';
import { INDENT_STEP, IndentStyle } from './indent';

class ListContainer extends Container {}
ListContainer.blotName = 'list-container';
ListContainer.tagName = 'OL';

class ListItem extends Block {
  static create(value: string) {
    const node = super.create() as HTMLElement;
    node.setAttribute('data-list', value);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('data-list') || undefined;
  }

  static register() {
    Quill.register(ListContainer);
  }

  constructor(scroll: Scroll, domNode: HTMLElement) {
    super(scroll, domNode);
    const ui = domNode.ownerDocument.createElement('span');
    const listEventHandler = (e: Event) => {
      if (!scroll.isEnabled()) return;
      const format = this.statics.formats(domNode, scroll);
      if (format === 'checked') {
        this.format('list', 'unchecked');
        e.preventDefault();
      } else if (format === 'unchecked') {
        this.format('list', 'checked');
        e.preventDefault();
      }
    };
    ui.addEventListener('mousedown', listEventHandler);
    ui.addEventListener('touchstart', listEventHandler);
    this.attachUI(ui);
  }

  format(name: string, value: string) {
    if (name === this.statics.blotName && value) {
      this.domNode.setAttribute('data-list', value);
    } else {
      if (name === IndentStyle.attrName) {
        super.format(name, +value * INDENT_STEP);
      } else {
        super.format(name, value);
      }
    }
  }
}
ListItem.blotName = 'list';
ListItem.tagName = 'LI';

ListContainer.allowedChildren = [ListItem];
ListItem.requiredContainer = ListContainer;

export { ListContainer, ListItem as default };
