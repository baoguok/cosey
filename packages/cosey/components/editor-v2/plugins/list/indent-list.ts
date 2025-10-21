import { Editor, Transforms, Path, Node, Text, Location, PathRef } from 'slate-vue3/core';
import {
  BulletedListElement,
  LIST_ITEM,
  ListItemElement,
  ListType,
  NumberedListElement,
} from '../../types';
import { Element } from 'slate-vue3/core';
import { isList, isListItem } from './utils';

function getListItems(editor: Editor) {
  const listItems: [ListItemElement, Path][] = [];

  // 遍历选区中的所有文本节点
  for (const [, path] of Editor.nodes(editor, {
    at: editor.selection!,
    match: Text.isText,
  })) {
    // 获取每个文本节点的最近 block 祖先
    const nodeEntry = Editor.above(editor, {
      at: path,
      match: (n) => Element.isElement(n) && n.type === LIST_ITEM,
    });

    if (nodeEntry && !listItems.find((item) => Path.equals(item[1], nodeEntry[1]))) {
      listItems.push(nodeEntry);
    }
  }

  return listItems;
}

function setSingleListChildren(editor: Editor, location: Location, isSingle: boolean) {
  Transforms.setNodes(
    editor,
    {
      onlyListAsChildren: isSingle,
    },
    {
      at: location,
    },
  );
}

interface FlatListItemInfo {
  index: number;
  indent: number;
  type: ListType;
  pathRef: PathRef;
}

function flatListItem(editor: Editor, list: BulletedListElement | NumberedListElement, path: Path) {
  const array: FlatListItemInfo[] = [];

  function recurse(list: BulletedListElement | NumberedListElement, parentPath: Path, indent = 0) {
    list.children.forEach((item, index) => {
      if (isListItem(item)) {
        const itemPath = [...parentPath, index];
        if (item.children.some((sub) => !isList(sub))) {
          array.push({
            index,
            indent,
            type: list.type,
            pathRef: Editor.pathRef(editor, itemPath),
          });
        }
        item.children.forEach((itemSub, index) => {
          if (isList(itemSub)) {
            recurse(itemSub, [...itemPath, index], indent + 1);
          }
        });
      }
    });
  }

  recurse(list, path);

  return array;
}

function insertListItem(editor: Editor, path: Path) {
  editor.insertNodes(
    {
      type: LIST_ITEM,
      children: [],
    },
    {
      at: path,
    },
  );
}

function inflateListItem(editor: Editor, listItemInfo: FlatListItemInfo[], path: Path) {
  const wrappers: PathRef[] = [];

  let lastItemPath: Path = [];

  for (const { index, indent, type, pathRef } of listItemInfo) {
    const currentWrapIndex = wrappers.length - 1;

    if (indent > currentWrapIndex) {
      let count = indent - currentWrapIndex;

      while (count > 0) {
        let listPath = [];
        if (wrappers.length === 0) {
          listPath = path;
        } else {
          const node = Node.getIf(editor, lastItemPath) as Element;
          listPath = [...lastItemPath, node.children.length];
        }

        editor.insertNodes(
          {
            type,
            children: [],
          },
          {
            at: listPath,
          },
        );
        const listPathRef = editor.pathRef(listPath);
        wrappers.push(listPathRef);

        const itemPath = [...listPath, index];
        insertListItem(editor, itemPath);
        if (count > 1) {
          setSingleListChildren(editor, itemPath, true);
        }

        lastItemPath = itemPath;

        count--;
      }
    } else if (indent < currentWrapIndex) {
      let count = currentWrapIndex - indent;
      while (count-- > 0) {
        wrappers.pop();
      }
      const listPathRef = wrappers[wrappers.length - 1];

      const itemPath = [...listPathRef!.current!, index];

      insertListItem(editor, itemPath);
      lastItemPath = itemPath;
    } else {
      const listPathRef = wrappers[currentWrapIndex];

      const itemPath = [...listPathRef!.current!, index];
      insertListItem(editor, itemPath);
      lastItemPath = itemPath;
    }

    // 将原 li 下非 list 节点移动到新 li下
    {
      const sourceItemPath = pathRef.unref()!;

      const sourceItemNode = Node.getIf(editor, sourceItemPath) as ListItemElement;

      let index = (sourceItemNode.children || []).length - 1;

      while (index >= 0) {
        const subNode = sourceItemNode.children[index];
        if (!isList(subNode)) {
          Transforms.moveNodes(editor, {
            at: [...sourceItemPath, index],
            to: [...lastItemPath, 0],
          });
        }
        index--;
      }
    }
  }
}

function updateFlatIndent(listItemInfo: FlatListItemInfo[]) {
  for (let i = 0; i < listItemInfo.length; i++) {
    const info = listItemInfo[i];

    if (i === 0) {
      info.indent = 0;
      continue;
    }

    const prevInfo = listItemInfo[i - 1];

    if (info.indent - prevInfo.indent > 1) {
      const trueIndent = prevInfo.indent + 1;

      for (let j = i + 1; j < listItemInfo.length; j++) {
        const laterInfo = listItemInfo[j];
        if (laterInfo.indent === info.indent) {
          laterInfo.indent = trueIndent;
          i++;
        } else {
          break;
        }
      }

      info.indent = trueIndent;
    }
  }
}

function updateFlatIndex(listItemInfo: FlatListItemInfo[]) {
  listItemInfo.forEach((info, index) => {
    if (index === 0) {
      return;
    }

    const prevInfo = listItemInfo[index - 1];

    if (info.indent > prevInfo.indent) {
      info.index = 0;
    } else if (info.indent === prevInfo.indent) {
      info.index = prevInfo.index + 1;
    } else {
      for (let i = index - 1; i >= 0; i--) {
        const prevInfo = listItemInfo[i];
        if (prevInfo.indent === info.indent) {
          info.index = prevInfo.index + 1;
          return;
        }
      }
      info.index = 1;
    }
  });
}

export function indentList(editor: Editor, delta: number) {
  const list = Editor.nodes(editor, {
    match: isList,
    mode: 'highest',
  });

  for (const [element, path] of list) {
    const listItemInfo = flatListItem(editor, element, path);

    const listItems = getListItems(editor);

    listItemInfo.forEach((info) => {
      const item = listItems.find((item) => Path.equals(item[1], info.pathRef.current!));
      if (item) {
        info.indent = Math.max(info.indent + delta, 0);
      }
    });

    updateFlatIndent(listItemInfo);
    updateFlatIndex(listItemInfo);

    Editor.withoutNormalizing(editor, () => {
      inflateListItem(editor, listItemInfo, path);

      const next = Path.next(path);
      editor.removeNodes({
        at: next,
      });
    });
  }
}
