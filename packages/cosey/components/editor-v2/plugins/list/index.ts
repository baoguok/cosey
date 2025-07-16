import { Editor } from 'slate-vue3/core';

import { indentList } from './indent-list';
import { insertBreak } from './insert-break';
import { formatList } from './format-list';
import { ListType } from '../../custom-types';

export * from './utils';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    indentList: (value: number) => void;
    formatList: (value: ListType) => void;
  }
}

export function withList(editor: Editor) {
  // 缩颈
  editor.indentList = (value: number) => {
    indentList(editor, value);
  };

  // 换行
  insertBreak(editor);

  // 格式化
  editor.formatList = (value: ListType) => {
    formatList(editor, value);
  };

  return editor;
}
