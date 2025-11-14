import { Editor, Range } from 'slate-vue3/core';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatColor: (color?: string) => void;
  }
}

function formatColor(editor: Editor, color?: string) {
  if (!editor.selection) return;

  if (Range.isCollapsed(editor.selection)) {
    return;
  }

  if (color) {
    Editor.addMark(editor, 'color', color);
  } else {
    Editor.removeMark(editor, 'color');
  }
}

export function withColor(editor: Editor) {
  editor.formatColor = (color?: string) => {
    formatColor(editor, color);
  };

  return editor;
}
