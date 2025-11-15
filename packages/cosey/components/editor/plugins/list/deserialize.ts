import { Descendant } from 'slate-vue3/core';
import { toArray } from '../../../../utils';
import {
  BulletedListElement,
  ListItemElement,
  NumberedListElement,
  tagToElementTypeMap,
} from '../../types';
import { LIST_MAX_LEVEL } from './utils';

interface ListItemTextLike {
  type: 'list-item-text-like';
  children: Descendant[];
}

interface ListItemLike {
  type: 'list-item-like';
  children: [ListItemTextLike, ListLike?];
}

interface ListLike {
  type: 'list-like';
  subType: 'bulleted-list' | 'numbered-list';
  children: ListItemLike[];
}

/**
 * - 合并直接 list 节点
 * - 其他节点合并作为 list-item-text-like 的 children
 */
function deserializeListItemLike(
  node: HTMLLIElement,
  deserialize: (node: Node, markAttributes?: {}) => Descendant | null | Descendant[],
): ListItemLike {
  const textChildren: Descendant[] = [];
  const listChildren: ListItemLike[] = [];
  let listType = '';

  for (const childNode of node.childNodes) {
    if (childNode instanceof HTMLUListElement || childNode instanceof HTMLOListElement) {
      if (!listType) {
        listType = tagToElementTypeMap[childNode.tagName as keyof typeof tagToElementTypeMap];
      }
      listChildren.push(...deserializeListLike(childNode, deserialize).children);
    } else {
      const result = deserialize(childNode);
      if (Array.isArray(result)) {
        textChildren.push(...result);
      } else if (result) {
        textChildren.push(result);
      }
    }
  }

  if (textChildren.length === 0) {
    textChildren.push({ text: '' });
  }
  const children: [ListItemTextLike, ListLike?] = [
    {
      type: 'list-item-text-like',
      children: textChildren,
    },
  ];

  if (listChildren.length > 0) {
    children[1] = {
      type: 'list-like',
      subType: listType as 'bulleted-list' | 'numbered-list',
      children: listChildren,
    };
  }

  return {
    type: 'list-item-like',
    children,
  };
}

function deserializeListLike(
  node: HTMLUListElement | HTMLOListElement,
  deserialize: (node: Node, markAttributes?: {}) => Descendant | null | Descendant[],
): ListLike {
  const children: ListItemLike[] = [];
  for (const childNode of node.childNodes) {
    if (childNode instanceof HTMLLIElement) {
      children.push(deserializeListItemLike(childNode, deserialize));
    } else if (childNode instanceof HTMLUListElement || childNode instanceof HTMLOListElement) {
      children.push({
        type: 'list-item-like',
        children: [
          {
            type: 'list-item-text-like',
            children: [{ text: '' }],
          },
          deserializeListLike(childNode, deserialize),
        ],
      });
    } else {
      const result = deserialize(childNode);
      if (result) {
        children.push({
          type: 'list-item-like',
          children: [
            {
              type: 'list-item-text-like',
              children: toArray(result),
            },
          ],
        });
      }
    }
  }

  return {
    type: 'list-like',
    subType: tagToElementTypeMap[node.tagName as keyof typeof tagToElementTypeMap] as
      | 'bulleted-list'
      | 'numbered-list',
    children,
  };
}

function flatList(list: ListLike, level = 0): ListItemElement[] {
  return list.children
    .map(({ children: [text, subList] }) => {
      const item: ListItemElement[] = [
        {
          type: 'list-item',
          listType: list.subType,
          level: Math.min(level, LIST_MAX_LEVEL - 1),
          children: text.children,
        },
      ];
      if (subList) {
        item.push(...flatList(subList, level + 1));
      }
      return item;
    })
    .flat(1);
}

export function deserializeList(
  node: HTMLUListElement | HTMLOListElement,
  deserialize: (node: Node, markAttributes?: {}) => Descendant | null | Descendant[],
): BulletedListElement | NumberedListElement {
  const listLike = deserializeListLike(node, deserialize);

  return {
    type: tagToElementTypeMap[node.tagName as keyof typeof tagToElementTypeMap] as
      | 'bulleted-list'
      | 'numbered-list',
    children: flatList(listLike),
  };
}
