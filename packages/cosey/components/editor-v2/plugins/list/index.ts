import { Editor } from 'slate-vue3/core';
import { ListItemElement, ListType } from '../../types';
import { ListItemComponent } from '../../list-item-component';
import { h } from 'vue';
import { useInheritRef } from 'slate-vue3';
import { normalizeNode } from './normalize';
import { getListTypeAtStartPoint, isListItem } from './utils';
import { formatList } from './format';
import { formatIndent } from './indent';
import { insertBreak } from './insert-break';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatList: (value: ListType) => void;
    isListItem: (element: unknown) => element is ListItemElement;
    getListTypeAtStartPoint: () => ListType | undefined;
  }
}

export function withList(editor: Editor) {
  const {
    insertBreak: srcInsertBreak,
    renderElement,
    formatIndent: srcFormatIndent,
    normalizeNode: srcNormalizeNode,
  } = editor;

  editor.renderElement = (props) => {
    const { attributes, children, element } = props;

    switch (element.type) {
      case 'bulleted-list':
        return h('ul', attributes, children);
      case 'numbered-list':
        return h('ol', attributes, children);
      case 'list-item':
        return h(
          ListItemComponent,
          {
            ...useInheritRef(attributes),
            level: element.level,
            listType: element.listType,
          },
          () => children,
        );
    }
    return renderElement(props);
  };

  editor.formatIndent = (value: number) => {
    formatIndent(editor, value);
    srcFormatIndent(value);
  };

  editor.insertBreak = () => {
    if (!insertBreak(editor)) {
      srcInsertBreak();
    }
  };

  editor.formatList = (value: ListType) => {
    formatList(editor, value);
  };

  editor.isListItem = isListItem;

  editor.normalizeNode = (entry, options) => {
    if (!normalizeNode(editor, entry)) {
      srcNormalizeNode(entry, options);
    }
  };

  editor.getListTypeAtStartPoint = () => {
    return getListTypeAtStartPoint(editor);
  };

  return editor;
}
