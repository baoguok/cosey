import {
  Editor,
  Element,
  Location,
  MaximizeMode,
  Node,
  NodeEntry,
  NodeMatch,
  Path,
  Point,
  Range,
} from 'slate-vue3/core';
import {
  CustomElement,
  HEADING_TYPES,
  HeadingElement,
  NORMAL_BLOCK_TYPES,
  type HeadingType,
  type NormalBlockType,
} from './types';

export function isParagraph(n: unknown) {
  return Element.isElementType(n, 'paragraph');
}

export function isNormalBlock(n: unknown) {
  return Element.isElement(n) && NORMAL_BLOCK_TYPES.includes(n.type as NormalBlockType);
}

export function isHeading(n: unknown): n is HeadingElement {
  return Element.isElement(n) && HEADING_TYPES.includes(n.type as HeadingType);
}

export function isBlockElement(editor: Editor, n: unknown): n is CustomElement {
  return Element.isElement(n) && editor.isBlock(n);
}

export function getPointingOptions(
  editor: Editor,
  type: CustomElement['type'],
): {
  at?: Location;
  match?: NodeMatch<CustomElement>;
  mode?: MaximizeMode;
} {
  const selection = editor.selection!;
  return {
    at: selection,
    match: (n, path) =>
      Element.isElementType(n, type) &&
      Path.isAncestor(path, selection.anchor.path) &&
      Path.isAncestor(path, selection.focus.path),
    mode: 'lowest',
  };
}

export function isPointingAt(editor: Editor, type: CustomElement['type']) {
  if (!editor.selection) return false;
  const nodes = editor.nodes(getPointingOptions(editor, type));
  return !nodes.next().done;
}

export function toggleBlockAttr(editor: Editor, key: string, value: string) {
  if (!editor.selection) return;

  const [match] = Array.from(
    editor.nodes({
      at: Editor.unhangRange(editor, editor.selection),
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
    editor.nodes({
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
export function isPointAtFirstLine(editor: Editor, elementPath: Path, point: Point) {
  const [currentBlock] = editor.nodes({
    at: point,
    mode: 'lowest',
    match: (n) => isBlockElement(editor, n),
  });

  const previousBlock = editor.previous({
    at: currentBlock[1],
    match: (n, path) => isBlockElement(editor, n) && Path.isAncestor(elementPath, path),
  });

  return !previousBlock;
}

/**
 * 判断某个 point 是否在指定块元素的尾行
 */
export function isPointAtLastLine(editor: Editor, elementPath: Path, point: Point) {
  const [currentBlock] = editor.nodes({
    at: point,
    mode: 'lowest',
    match: (n) => isBlockElement(editor, n),
  });

  const nextBlock = editor.next({
    at: currentBlock[1],
    match: (n, path) => isBlockElement(editor, n) && Path.isAncestor(elementPath, path),
  });

  return !nextBlock;
}

/**
 * 接收 range，返回排序后的 range
 */
export function getSortedRange(range: Range): Range {
  return Range.isBackward(range)
    ? {
        anchor: range.focus,
        focus: range.anchor,
      }
    : range;
}

// before 0b100
// equal 0b010
// after 0b001

function pathCompare(path: Path, another: Path): number {
  const min = Math.min(path.length, another.length);

  for (let i = 0; i < min; i++) {
    if (path[i] < another[i]) return 0b100;
    if (path[i] > another[i]) return 0b001;
  }

  return 0b010;
}

function pointCompare(point: Point, another: Point): number {
  const result = pathCompare(point.path, another.path);

  if (result === 0b010) {
    if (point.offset < another.offset) return 0b100;
    if (point.offset > another.offset) return 0b001;
    return 0b010;
  }

  return result;
}

export enum RangePosition {
  BEFORE = 0b100100100100,
  BEFORE_BEGIN = 0b100100010100,
  INTERSECT_BEGIN = 0b100100001100,
  AFTER_BEGIN = 0b010100001100,
  CONTAIN = 0b001100001100,
  BEFORE_END = 0b001100001010,
  INTERSECT_END = 0b001100001001,
  AFTER_END = 0b001010001001,
  AFTER = 0b001001001001,
  COVER = 0b010100001010,
  COVER_BEGIN = 0b100100001010,
  COVER_END = 0b010100001001,
  COVER_BOTH = 0b100100001001,
  BEGIN = 0b010100010100,
  END = 0b001010001010,
}

/**
 * 获取目标相较于当前范围的位置
 */
export function getRangePosition(range: Range, target: Range): RangePosition {
  const ss = pointCompare(target.anchor, range.anchor);
  const se = pointCompare(target.anchor, range.focus);
  const es = pointCompare(target.focus, range.anchor);
  const ee = pointCompare(target.focus, range.focus);

  return (ss << 9) | (se << 6) | (es << 3) | ee;
}

/**
 * 获取上一个同级节点，找不到则返回 undefined
 */
export function getPreviousSibling<T extends Node>(
  editor: Editor,
  path: Path,
  options: {
    quit?: (node: Node, path: Path) => boolean;
    match?: NodeMatch<T>;
  } = {},
): NodeEntry<T> | undefined {
  const { match, quit } = options;

  const [parentNode, parentPath] = editor.parent(path);

  for (let i = path[path.length - 1] - 1; i >= 0; i--) {
    const childNode = parentNode.children[i];
    const childPath = [...parentPath, i];

    if (!childNode) return;

    if (quit && quit(childNode, childPath)) return;

    if (!match || match(childNode, childPath)) {
      return [childNode as T, childPath];
    }
  }
}

/**
 * 获取下一个同级节点，找不到则返回 undefined
 */
export function getNextSibling<T extends Node>(
  editor: Editor,
  path: Path,
  options: {
    quit?: (node: Node, path: Path) => boolean;
    match?: (node: Node, path: Path) => boolean;
  } = {},
): NodeEntry<T> | undefined {
  const { match = () => true, quit } = options;

  const [parentNode, parentPath] = editor.parent(path);

  for (let i = path[path.length - 1] + 1; i < parentNode.children.length; i++) {
    const childNode = parentNode.children[i];
    const childPath = [...parentPath, i];

    if (!childNode) return;

    if (quit && quit(childNode, childPath)) return;

    if (match(childNode, childPath)) {
      return [childNode as T, childPath];
    }
  }
}

export function isEdgesEqual(edges: [Point, Point], another: [Point, Point]) {
  return Point.equals(edges[0], another[0]) && Point.equals(edges[1], another[1]);
}
