import { Editor, Transforms } from 'slate-vue3/core';
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
        Transforms.liftNodes(editor, {
          at: path,
          mode: 'lowest',
        });
        Transforms.setNodes(editor, { type: 'paragraph' });
        return;
      }
    }

    insertBreak();
  };
}
