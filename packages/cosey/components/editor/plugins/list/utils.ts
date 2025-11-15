import { Editor, Element } from 'slate-vue3/core';
import { BulletedListElement, ListItemElement, ListType, NumberedListElement } from '../../types';

export const LIST_MAX_LEVEL = 6;

export function isListItem(element: unknown): element is ListItemElement {
  return Element.isElementType(element, 'list-item');
}

export function isList(element: unknown): element is BulletedListElement | NumberedListElement {
  return (
    Element.isElement(element) &&
    (element.type === 'numbered-list' || element.type === 'bulleted-list')
  );
}

export function getListTypeAtStartPoint(editor: Editor): ListType | undefined {
  if (!editor.selection) return;

  const [start] = editor.edges(editor.selection);

  const [entry] = Array.from(
    editor.nodes({
      at: start,
      match: isListItem,
    }),
  );

  if (entry) {
    return entry[0].listType;
  }
}
