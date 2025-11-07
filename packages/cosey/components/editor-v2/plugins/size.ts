import { Editor, Range } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';
import { getStyle } from '../../../utils';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatSize: (value: string) => void;
    formatSizeDelta: (delta: number, callback: (numSize: number) => void) => void;
  }
}

function formatSize(editor: Editor, value: string) {
  DOMEditor.focus(editor);

  if (Range.isCollapsed(editor.selection!)) {
    return;
  }

  Editor.addMark(editor, 'size', value);
}

function formatSizeDelta(editor: Editor, delta: number, callback: (numSize: number) => void) {
  DOMEditor.focus(editor);

  if (Range.isCollapsed(editor.selection!)) {
    return;
  }

  const marks = Editor.marks(editor);
  const size = marks ? marks['size' as keyof typeof marks] : '';

  let numSize = 14;
  if (size) {
    numSize = parseInt(size as string);
  } else {
    const domRange = DOMEditor.toDOMRange(editor, editor.selection!);
    let node = domRange.startContainer;
    if (node.nodeType === 3) {
      node = node.parentElement!;
    }
    numSize = parseInt(getStyle(node as HTMLElement, 'fontSize') as string);
  }

  numSize += delta;
  if (numSize < 0) {
    numSize = 0;
  }
  Editor.addMark(editor, 'size', numSize + 'px');

  callback(numSize);
}

export function withSize(editor: Editor) {
  editor.formatSize = (value: string) => {
    formatSize(editor, value);
  };

  editor.formatSizeDelta = (delta: number, callback: (numSize: number) => void) => {
    formatSizeDelta(editor, delta, callback);
  };

  return editor;
}
