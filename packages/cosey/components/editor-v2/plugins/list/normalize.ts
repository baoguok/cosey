import { Editor, Element, Node, Text } from 'slate-vue3/core';
import { type ListItemElement, type ParagraphElement } from '../../types';
import { type NodeEntry } from 'slate-vue3/core';
import { getNextSibling, getPreviousSibling } from '../../utils';
import { isList, isListItem } from './utils';

function mergeListWithPreviousSiblingList(editor: Editor, [node, path]: NodeEntry<Node>) {
  if (!isList(node)) return;

  const previousSibling = editor.previous({
    at: path,
  });

  if (!previousSibling) return;

  const [previousSiblingNode] = previousSibling;

  if (!isList(previousSiblingNode)) return;

  if (previousSiblingNode.type !== node.type) return;

  editor.mergeNodes({
    at: path,
  });

  return true;
}

function getPreviousSameLevelSibling(
  editor: Editor,
  [node, path]: NodeEntry<ListItemElement>,
): NodeEntry<ListItemElement> | undefined {
  return getPreviousSibling<ListItemElement>(editor, path, {
    quit(n) {
      return isListItem(n) && n.level < node.level;
    },
    match(n) {
      return isListItem(n) && n.level === node.level;
    },
  });
}

function getNextSameLevelSibling(
  editor: Editor,
  [node, path]: NodeEntry<ListItemElement>,
): NodeEntry<ListItemElement> | undefined {
  return getNextSibling<ListItemElement>(editor, path, {
    quit(n) {
      return isListItem(n) && n.level < node.level;
    },
    match(n) {
      return isListItem(n) && n.level === node.level;
    },
  });
}

function keepSameWithSibling(
  editor: Editor,
  entry: NodeEntry<ListItemElement>,
  sibling: NodeEntry<ListItemElement>,
) {
  const [node, path] = entry;
  const [siblingNode] = sibling;
  if (siblingNode.listType !== node.listType) {
    editor.setNodes(
      {
        listType: siblingNode.listType,
      },
      {
        at: path,
      },
    );
    return true;
  }
}

/**
 * 规则：
 * - 同一层级的、相邻的、同一类型的 list 需合并
 */
function normalizeSiblingLists(editor: Editor, entry: NodeEntry<Node>) {
  const normalized = mergeListWithPreviousSiblingList(editor, entry);

  if (normalized) return true;

  const [, path] = entry;
  const nextSibling = editor.next({
    at: path,
  });

  if (nextSibling) {
    return mergeListWithPreviousSiblingList(editor, nextSibling);
  }
}

/**
 * 规则
 * - 同一级的 list-item 的列表类型需相同
 */
function normalizeSameTypeWithSibling(editor: Editor, entry: NodeEntry<Node>) {
  const [node] = entry;

  if (!isListItem(node)) return;

  const prevSibling = getPreviousSameLevelSibling(editor, entry as NodeEntry<ListItemElement>);

  if (prevSibling) {
    const normalized = keepSameWithSibling(
      editor,
      entry as NodeEntry<ListItemElement>,
      prevSibling,
    );

    if (normalized) return true;

    const nextSibling = getNextSameLevelSibling(editor, entry as NodeEntry<ListItemElement>);
    if (nextSibling) {
      return keepSameWithSibling(editor, nextSibling, entry as NodeEntry<ListItemElement>);
    }
  } else {
    const nextSibling = getNextSameLevelSibling(editor, entry as NodeEntry<ListItemElement>);
    if (nextSibling) {
      return keepSameWithSibling(editor, entry as NodeEntry<ListItemElement>, nextSibling);
    }
  }
}

/**
 * 规则
 * - list-item 只能包含非块级元素
 */
function normalizeLisItemChildren(editor: Editor, [node, path]: NodeEntry<Node>) {
  if (!isListItem(node)) return;

  const children = Array.from(Node.children(editor, path));

  for (const [childNode, childPath] of children) {
    if (Element.isElement(childNode) && !editor.isInline(childNode)) {
      editor.unwrapNodes({
        at: childPath,
      });
      return true;
    }
  }
}

/**
 * 规则：
 * - list-item 只能位于 numbered-list 或 bulleted-list 中
 */
function normalizeLisItem(editor: Editor, entry: NodeEntry<Node>) {
  const [node, path] = entry;

  if (!isListItem(node)) return;

  if (!isList(Node.parent(editor, path))) {
    editor.setNodes<ParagraphElement>(
      {
        type: 'paragraph',
      },
      {
        at: path,
      },
    );
    return true;
  }
}

/**
 * 规则：
 * - 列表类型需和最高级别列表项对应的列表类型一致
 * - 只能包含 list-item
 */
function normalizeList(editor: Editor, [node, path]: NodeEntry<Node>) {
  if (!isList(node)) return;

  for (let i = 0; i < node.children.length; i++) {
    const childNode = node.children[i];

    if (!isListItem(childNode)) {
      if (Text.isText(childNode)) {
        editor.wrapNodes(
          {
            type: 'list-item',
            level: 0,
            listType: node.type,
            children: [],
          },
          {
            at: [...path, i],
          },
        );
        return true;
      }

      editor.setNodes(
        {
          type: 'list-item',
          level: 0,
          listType: node.type,
        },
        {
          at: [...path, i],
        },
      );
      return true;
    }
  }

  const topLevelChildNodes = node.children.filter(
    (item) => isListItem(item) && item.level === 0,
  ) as ListItemElement[];

  if (topLevelChildNodes.length > 0) {
    const listType = topLevelChildNodes[0].listType;
    if (listType !== node.type) {
      editor.setNodes(
        {
          type: listType,
        },
        {
          at: path,
        },
      );
      return true;
    }
  }
}

export function normalizeNode(editor: Editor, entry: NodeEntry<Node>) {
  return (
    normalizeList(editor, entry) ||
    normalizeSiblingLists(editor, entry) ||
    normalizeLisItem(editor, entry) ||
    normalizeSameTypeWithSibling(editor, entry) ||
    normalizeLisItemChildren(editor, entry)
  );
}
