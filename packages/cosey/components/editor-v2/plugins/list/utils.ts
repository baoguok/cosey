import { Editor, Element, Node, Path } from 'slate-vue3/core';
import {
  BulletedListElement,
  LIST_ITEM,
  LIST_TYPES,
  ListItemElement,
  ListType,
  NumberedListElement,
} from '../../types';

export function isListItem(element: unknown): element is ListItemElement {
  return Element.isElement(element) && element.type === LIST_ITEM;
}

export function isList(element: unknown): element is BulletedListElement | NumberedListElement {
  return Element.isElement(element) && LIST_TYPES.includes(element.type as ListType);
}

export function getItemDepth(editor: Editor, path: Path) {
  return Array.from(Node.ancestors(editor, path)).filter(([node]) => isListItem(node)).length;
}
