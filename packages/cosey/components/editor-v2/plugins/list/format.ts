import { Editor, Element, Path } from 'slate-vue3/core';
import { type ListItemElement, type ListType, type ParagraphElement } from '../../types';
import { type NodeEntry } from 'slate-vue3/core';
import { getListTypeAtStartPoint, isList, isListItem } from './utils';
import { isBlockElement } from '../../utils';

const replaceableElements = [
  'block',
  'paragraph',
  'block-quote',
  'heading-one',
  'heading-two',
  'heading-three',
  'heading-four',
  'heading-five',
  'heading-six',
];

function isSameParent(path: Path, another: Path) {
  return Path.equals(Path.parent(path), Path.parent(another));
}

function findConsecutiveListItems(editor: Editor) {
  const groups = [];
  let currentGroup: {
    node: ListItemElement;
    path: Path;
  }[] = [];

  // 获取选区内的所有节点
  const nodes = Array.from(
    editor.nodes({
      match: (n) => isBlockElement(editor, n),
    }),
  );

  nodes.forEach(([node, path]) => {
    if (isListItem(node) && !isList(editor.parent(path)[0])) {
      if (currentGroup.length === 0 || isSameParent(currentGroup[0].path, path)) {
        currentGroup.push({ node, path });
      } else {
        groups.push([...currentGroup]);
        currentGroup = [{ node, path }];
      }
    } else {
      if (currentGroup.length > 0) {
        groups.push([...currentGroup]);
        currentGroup = [];
      }
    }
  });

  // 添加最后一个组
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

function wrapListItems(editor: Editor, type: ListType) {
  const [match] = editor.nodes({
    match: (n, path) => isListItem(n) && !isList(editor.parent(path)[0]),
  });

  if (!match) return;

  const liGroups = findConsecutiveListItems(editor);

  // 对每个连续的 li 组分别包裹(倒序)
  for (let i = liGroups.length - 1; i >= 0; i--) {
    const group = liGroups[i];

    if (group.length > 0) {
      editor.wrapNodes(
        {
          type,
          children: [],
        },
        {
          at: {
            anchor: editor.start(group[0].path),
            focus: editor.end(group[group.length - 1].path),
          },
          match: isListItem,
          mode: 'lowest',
          voids: false,
        },
      );
    }
  }
}

function getSameLevelSiblings(editor: Editor, [node, path]: NodeEntry<ListItemElement>) {
  const [parentNode, parentPath] = editor.parent(path);

  const siblings: NodeEntry<ListItemElement>[] = [[node, path]];

  const currentIndex = path[path.length - 1];

  for (let i = currentIndex - 1; i >= 0; i--) {
    const childNode = parentNode.children[i] as ListItemElement;

    if (childNode) {
      if (childNode.level < node.level) {
        break;
      }
      if (childNode.level === node.level) {
        siblings.unshift([childNode as ListItemElement, [...parentPath, i]]);
      }
    }
  }

  for (let i = currentIndex + 1; i < parentNode.children.length; i++) {
    const childNode = parentNode.children[i] as ListItemElement;

    if (childNode) {
      if (childNode.level < node.level) {
        break;
      }
      if (childNode.level === node.level) {
        siblings.push([childNode as ListItemElement, [...parentPath, i]]);
      }
    }
  }

  return siblings;
}

/*
  规则：
  - 同类型会取消列表化，不同类型会列表化
  - 通过选区 start 位置判断是否已列表化以及列表类型
  - 只能格式化指定块级元素
  - 可分段式格式化
  - 同级的列表会合并
  */
export function formatList(editor: Editor, value: ListType) {
  if (!editor.selection) return;

  const listType = getListTypeAtStartPoint(editor);

  if (listType === value) {
    editor.unwrapNodes({
      match: isList,
      split: true,
    });
    editor.setNodes<ParagraphElement>(
      {
        type: 'paragraph',
      },
      {
        match: isListItem,
      },
    );
  } else {
    const nodeEntries = Array.from(
      editor.nodes({
        match: isListItem,
      }),
    );

    editor.withoutNormalizing(() => {
      for (const nodeEntry of nodeEntries) {
        const siblings = getSameLevelSiblings(editor, nodeEntry);
        siblings.forEach(([siblingNode, siblingPath]) => {
          if (siblingNode.listType !== value) {
            editor.setNodes(
              {
                listType: value,
              },
              {
                at: siblingPath,
              },
            );
          }
        });
      }

      editor.setNodes<ListItemElement>(
        {
          type: 'list-item',
          level: 0,
          listType: value,
        },
        {
          match: (n) => Element.isElement(n) && replaceableElements.includes(n.type),
        },
      );
      wrapListItems(editor, value);
    });
  }
}
