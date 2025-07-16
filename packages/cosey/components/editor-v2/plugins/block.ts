import { Editor, Element, Transforms } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';
import { CustomElement } from '../custom-types';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatBlock: (value: string) => void;
  }
}

export function withBlock(editor: Editor) {
  editor.formatBlock = (value: string) => {
    DOMEditor.focus(editor);

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, editor.selection!),
        match: (n) => {
          return !Editor.isEditor(n) && Element.isElement(n) && n.type === value;
        },
      }),
    );

    const active = !!match;

    Transforms.setNodes<Element>(editor, {
      type: active ? 'paragraph' : value,
    } as CustomElement);
  };

  return editor;
}
