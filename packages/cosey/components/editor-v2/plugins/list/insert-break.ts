import { Editor } from 'slate-vue3/core';
import { getItemDepth, isListItem } from './utils';

export function insertBreak(editor: Editor) {
  const { insertBreak } = editor;
  editor.insertBreak = () => {
    const [match] = Editor.nodes(editor, {
      match: isListItem,
      mode: 'lowest',
    });

    if (match) {
      const [node, path] = match;
      if (Editor.isEmpty(editor, node) && getItemDepth(editor, path) === 0) {
        editor.liftNodes({
          at: path,
          mode: 'lowest',
        });
        editor.setNodes({ type: 'paragraph' });
        return;
      }
    }

    insertBreak();
  };
}
