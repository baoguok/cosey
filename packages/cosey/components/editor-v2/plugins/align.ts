import { Editor } from 'slate-vue3/core';
import { toggleBlockAttr } from './utils';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatAlign: (value: string) => void;
  }
}

export function withAlign(editor: Editor) {
  editor.formatAlign = (value: string) => {
    toggleBlockAttr(editor, 'align', value);
  };

  return editor;
}
