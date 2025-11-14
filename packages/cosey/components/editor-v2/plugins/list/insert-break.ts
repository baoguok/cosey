import { Editor } from 'slate-vue3/core';
import { isListItem } from './utils';
import { formatIndent } from './indent';

export function insertBreak(editor: Editor) {
  const [match] = editor.nodes({
    match: isListItem,
    mode: 'lowest',
  });

  if (match) {
    const [node] = match;
    if (Editor.isEmpty(editor, node)) {
      formatIndent(editor, -1);
      return true;
    }
  }
}
