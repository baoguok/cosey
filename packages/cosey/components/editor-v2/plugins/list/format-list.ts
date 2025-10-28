import { Editor, Element, isBlock, Node, NodeEntry, Path, Text } from 'slate-vue3/core';
import { ListType } from '../../types';
import { DOMEditor } from 'slate-vue3/dom';
import { isList, isListItem } from './utils';
import { liftToRootNode, mergePrevNode, normalizeList, setNodeType } from '../../utils';

export function formatList(editor: Editor, value: ListType) {
  DOMEditor.focus(editor);

  const nodeEntries: NodeEntry<Element>[] = [];

  // 遍历选区中的所有文本节点
  for (const [, path] of Editor.nodes(editor, {
    at: editor.selection!,
    match: Text.isText,
  })) {
    // 获取每个文本节点的最近 block 祖先
    const nodeEntry = Editor.above<Element>(editor, {
      at: path,
      match: (n) =>
        isListItem(n) ||
        (!Editor.isEditor(n) && Element.isElement(n) && isBlock(editor, n) && !isList(n)),
    });

    if (nodeEntry && nodeEntries.every(([el]) => el !== nodeEntry[0])) {
      nodeEntries.push(nodeEntry);
    }
  }

  let mayNormalizeListPaths: Path | null = null;

  const entries = nodeEntries.map(
    ([element, path]) =>
      [
        element,
        editor.pathRef(path),
        isListItem(element) ? (Node.parent(editor, path) as Element).type : null,
      ] as const,
  );

  for (const [element, pathRef, parentType] of entries) {
    const path = pathRef.unref()!;

    if (isListItem(element)) {
      if (parentType !== value) {
        setNodeType(editor, value, Path.parent(path));
      } else {
        setNodeType(editor, 'paragraph', path);

        const currentPath = liftToRootNode(editor, path);
        const nextPath = Path.next(currentPath);
        mayNormalizeListPaths = nextPath;
      }
    } else {
      setNodeType(editor, 'list-item', path);
      editor.wrapNodes(
        { type: value, children: [] },
        {
          at: path,
        },
      );

      const nextPathRef = Editor.pathRef(editor, Path.next(path));
      mergePrevNode(editor, path);
      mergePrevNode(editor, nextPathRef.unref()!);
    }
  }

  if (mayNormalizeListPaths) {
    if (isList(Node.getIf(editor, mayNormalizeListPaths))) {
      normalizeList(editor, mayNormalizeListPaths);
    }
  }
}
