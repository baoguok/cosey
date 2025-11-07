import { Editor, Range } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatBackground: (color?: string) => void;
  }
}

function formatBackground(editor: Editor, color?: string) {
  DOMEditor.focus(editor);

  if (Range.isCollapsed(editor.selection!)) {
    return;
  }

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
