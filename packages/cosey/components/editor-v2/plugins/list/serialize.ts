import { Node } from 'slate-vue3/core';
import {
  BulletedListElement,
  ListItemElement,
  NestedBulletedListElement,
  NestedListItemElement,
  NestedNumberedListElement,
  NumberedListElement,
} from '../../types';

function findSameLevelListType(
  items: ListItemElement[],
  index: number,
  level: number,
): 'nested-bulleted-list' | 'nested-numbered-list' {
  for (let i = index; i < items.length; i++) {
    const item = items[i];
    if (item.level === level) {
      return `nested-${items[i].listType}`;
    }
    if (item.level < level) {
      return 'nested-bulleted-list';
    }
  }
  return 'nested-bulleted-list';
}

export function serializeList(
  node: BulletedListElement | NumberedListElement,
  serialize: (node: Node) => string,
) {
  const rootListItem: NestedListItemElement = {
    type: 'nested-list-item',
    children: [],
    parent: null,
  };

  let currentList: NestedBulletedListElement | NestedNumberedListElement | null = null;
  let prevLevel = -1;
  let prevListItem = rootListItem;

  node.children.forEach((childNode, index) => {
    const level = childNode.level;

    let diffLevel = level - prevLevel;

    if (diffLevel > 0) {
      while (--diffLevel) {
        currentList = {
          type: findSameLevelListType(node.children, index, level - diffLevel),
          children: [],
          parent: prevListItem,
        };
        prevListItem.children.push(currentList!);

        prevListItem = {
          type: 'nested-list-item',
          children: [{ text: '' }],
          parent: currentList,
        };
        currentList!.children.push(prevListItem);
      }

      currentList = {
        type: `nested-${childNode.listType}`,
        children: [],
        parent: prevListItem,
      };
      prevListItem.children.push(currentList!);
    } else if (diffLevel < 0) {
      while (diffLevel++) {
        currentList = currentList!.parent!.parent!;
      }
    }

    const listItemNode: NestedListItemElement = {
      type: 'nested-list-item',
      children: [...childNode.children],
      parent: currentList,
    };
    currentList!.children.push(listItemNode);

    prevListItem = listItemNode;
    prevLevel = level;
  });

  return serialize(rootListItem.children[0]);
}
