import { Editor, Range } from 'slate-vue3/core';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatMark: (mark: string) => void;
  }
}

function formatMark(editor: Editor, mark: string) {
  if (!editor.selection) return;

  if (Range.isCollapsed(editor.selection)) {
    return;
  }

  const marks = Editor.marks(editor)!;

  if ('superscript' in marks && mark === 'subscript') {
    Editor.removeMark(editor, 'superscript');
  } else if ('subscript' in marks && mark === 'superscript') {
    Editor.removeMark(editor, 'subscript');
  }

  if (marks[mark as keyof typeof marks]) {
    Editor.removeMark(editor, mark);
  } else {
    Editor.addMark(editor, mark, true);
  }
}

export function withMark(editor: Editor) {
  editor.formatMark = (mark: string) => {
    formatMark(editor, mark);
  };

  return editor;
}
