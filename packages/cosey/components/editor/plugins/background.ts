import { Editor, Range } from 'slate-vue3/core';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatBackground: (color?: string) => void;
  }
}

function formatBackground(editor: Editor, color?: string) {
  if (!editor.selection) return;

  if (Range.isCollapsed(editor.selection)) return;

  if (color) {
    Editor.addMark(editor, 'background', color);
  } else {
    Editor.removeMark(editor, 'background');
  }
}

export function withBackground(editor: Editor) {
  editor.formatBackground = (color?: string) => {
    formatBackground(editor, color);
  };

  return editor;
}
