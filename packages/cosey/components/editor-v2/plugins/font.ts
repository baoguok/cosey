import { Editor, Range } from 'slate-vue3/core';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatFont: (value: string) => void;
  }
}

function formatFont(editor: Editor, value: string) {
  if (!editor.selection) return;

  if (Range.isCollapsed(editor.selection)) {
    return;
  }

  Editor.addMark(editor, 'font', value);
}

export function withFont(editor: Editor) {
  editor.formatFont = (value: string) => {
    formatFont(editor, value);
  };

  return editor;
}
