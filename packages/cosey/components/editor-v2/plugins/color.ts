import { Editor, Range } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatColor: (color?: string) => void;
  }
}

function formatColor(editor: Editor, color?: string) {
  DOMEditor.focus(editor);

  if (Range.isCollapsed(editor.selection!)) {
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
