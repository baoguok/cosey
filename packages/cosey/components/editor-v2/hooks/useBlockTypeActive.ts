import { useEditor } from 'slate-vue3';
import { Text, isBlock, Element, NodeEntry, Editor } from 'slate-vue3/core';
import { computed } from 'vue';
import { isListItem } from '../plugins/list';

export function useBlockTypeActive(format: string) {
  const editor = useEditor();

  return computed(() => {
    if (!editor.selection) return false;

    const nodeEntries: NodeEntry<Element>[] = [];

    // 遍历选区中的所有文本节点
    for (const [, path] of editor.nodes({
      at: editor.selection!,
      match: Text.isText,
    })) {
      // 获取每个文本节点的最近 block 祖先
      const nodeEntry = Editor.above<Element>(editor, {
        at: path,
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && isBlock(editor, n) && !isListItem(n),
      });

      if (nodeEntry && nodeEntries.every(([el]) => el !== nodeEntry[0])) {
        nodeEntries.push(nodeEntry);
      }
    }

    return nodeEntries.some(([element]) => element.type === format);
  });
}
