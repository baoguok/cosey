import { Editor } from 'slate-vue3/core';
import { type CustomElement } from '../custom-types';

declare module 'slate-vue3/core' {
  interface BaseEditor {}
}

export function withLink(editor: Editor) {
  const isInline = editor.isInline;
  editor.isInline = (value: CustomElement) => {
    return value.type === 'link' ? true : isInline(value);
  };

  return editor;
}
