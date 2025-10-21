import {
  Editor,
  Element,
  Node,
  NodeEntry,
  Path,
  Point,
  Range,
  Text,
  Transforms,
} from 'slate-vue3/core';
import { isList, isListItem } from './list';
import { DOMEditor } from 'slate-vue3/dom';
import { CustomElement } from '../types';

export function liftToRootNode(editor: Editor, path: Path) {
  let length = path.length;
  let currentPath = path;

  while (length > 1) {
    Transforms.liftNodes(editor, {
      at: currentPath,
    });

    if (currentPath[currentPath.length - 1] === 0) {
      currentPath = currentPath.slice(0, -1);
    } else {
      currentPath = currentPath.slice(0, -1);
      currentPath[currentPath.length - 1] += 1;
    }

    length--;
  }

  return currentPath;
}

export function normalizeList(editor: Editor, path: Path) {
  Editor.nodes(editor, {
    at: path,
    match(node) {
      return isListItem(node);
    },
  }).forEach(([element, path]) => {
    if (element.children.length === 1 && isList(element.children[0])) {
      Transforms.setNodes(
        editor,
        {
          onlyListAsChildren: true,
        },
        {
          at: path,
        },
      );
    }
  });
}

export function setNodeType(editor: Editor, type: string, path: Path) {
  Transforms.setNodes(
    editor,
    {
      type: type as any,
    },
    {
      at: path,
    },
  );
}

export function mergePrevNode(editor: Editor, path: Path | null | undefined) {
  if (path && path.length && Path.hasPrevious(path)) {
    const prevPath = Path.previous(path);
    const prevNode = Node.getIf(editor, prevPath);
    const node = Node.getIf(editor, path);
    if (
      (Text.isText(prevNode) && Text.isText(node)) ||
      (Element.isElement(prevNode) && Element.isElement(node) && prevNode.type === node.type)
    ) {
      Transforms.mergeNodes(editor, {
        at: path,
      });
    }
  }
}

export function toggleBlockAttr(editor: Editor, key: string, value: string) {
  DOMEditor.focus(editor);

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, editor.selection!),
      match: (n) => {
        return (
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n[key as keyof typeof n] === (value as string)
        );
      },
    }),
  );

  const active = !!match;

  Transforms.setNodes<Element>(editor, {
    [key]: active ? undefined : value,
  });
}

/**
 * 判断光标是否指向某个块元素的最后
 * @param editor 编辑器实例对象
 * @param type 元素类型
 * @param callback 可选的回调，在满足条件时调用，并接收此元素和其路径
 * @returns
 */
export function isPointAtEndOfElement(
  editor: Editor,
  type: CustomElement['type'],
  callback?: (match: NodeEntry) => void,
) {
  const selection = editor.selection;
  if (!selection || !Range.isCollapsed(selection)) {
    return false;
  }

  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === type,
    }),
  );

  const result = !!(match && Point.equals(Editor.end(editor, match[1]), selection.focus));
  if (result && callback) {
    callback(match);
  }
  return result;
}
