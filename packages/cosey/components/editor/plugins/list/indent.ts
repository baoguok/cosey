import { Editor, Path } from 'slate-vue3/core';
import { type ParagraphElement } from '../../types';
import { isList, isListItem, LIST_MAX_LEVEL } from './utils';

export function formatIndent(editor: Editor, value: number) {
  const listItemNodes = Array.from(
    editor.nodes({
      match: isListItem,
    }),
  ).map(([node, path]) => [node, editor.pathRef(path)] as const);

  for (const [node, path] of listItemNodes) {
    const nextLevel = Math.min((node.level || 0) + value, LIST_MAX_LEVEL - 1);

    if (nextLevel < 0) {
      editor.unwrapNodes({
        match: isList,
        split: true,
        at: path.current as Path,
      });
      editor.setNodes<ParagraphElement>(
        {
          type: 'paragraph',
        },
        {
          at: path.unref() as Path,
        },
      );
    } else if (node.level !== nextLevel) {
      editor.setNodes(
        {
          level: nextLevel,
        },
        {
          at: path.unref() as Path,
        },
      );
    }
  }
}
