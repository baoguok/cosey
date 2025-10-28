import { Editor, Element, Node, NodeEntry, Path, Point, Range, Text } from 'slate-vue3/core';
import { isList, isListItem } from './plugins/list';
import { DOMEditor } from 'slate-vue3/dom';
import { CustomElement } from './types';

export function liftToRootNode(editor: Editor, path: Path) {
  let length = path.length;
  let currentPath = path;

  while (length > 1) {
    editor.liftNodes({
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
      editor.setNodes(
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
  editor.setNodes(
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
      editor.mergeNodes({
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

  editor.setNodes<Element>({
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

/**
 * 判断两范围是否相等
 *
 * 不像 Range.equals 需要anchor和focus的位置相同；此函数在anchor和focus相反时也能返回真。
 *
 *
 */
export function isRangeEqual(r1: Range, r2: Range) {
  return (
    (Point.equals(r1.anchor, r2.anchor) && Point.equals(r1.focus, r2.focus)) ||
    (Point.equals(r1.anchor, r2.focus) && Point.equals(r1.focus, r2.anchor))
  );
}

/**
 * 判断某个 point 是否在指定块元素的首行
 */
export function isPointAtFirstLine(
  editor: Editor,
  elementPath: Path,
  point: Point,
  callback: () => void,
) {
  const containerStart = Editor.start(editor, elementPath);

  if (Point.equals(point, containerStart)) {
    return callback();
  }

  const string = Editor.string(editor, {
    anchor: containerStart,
    focus: point,
  });

  const result = !string.includes('\n');

  if (result) {
    return callback();
  }

  return result;
}

/**
 * 判断某个 point 是否在指定块元素的尾行
 */
export function isPointAtLastLine(
  editor: Editor,
  elementPath: Path,
  point: Point,
  callback: () => void,
) {
  const containerEnd = Editor.end(editor, elementPath);

  if (Point.equals(point, containerEnd)) {
    return callback();
  }

  const string = Editor.string(editor, {
    anchor: point,
    focus: containerEnd,
  });

  const result = !string.includes('\n');

  if (result) {
    return callback();
  }

  return result;
}

/**
 * 接收 range，返回排序后的 range
 */
export function sortRange(range: Range): Range {
  return Range.isBackward(range)
    ? {
        anchor: range.focus,
        focus: range.anchor,
      }
    : range;
}
