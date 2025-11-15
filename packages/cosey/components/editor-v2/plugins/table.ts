import { h } from 'vue';
import { Element, Point, Editor, Range, Node, Path, NodeEntry } from 'slate-vue3/core';
import { isBlockElement, isEdgesEqual, isPointAtFirstLine, isPointAtLastLine } from '../utils';
import { Hotkeys } from './keyboard';
import {
  type TableElement,
  type TableCellElement,
  type TableRowElement,
  type TableBodyElement,
  type TableHeadElement,
} from '../types';
import ContentTable from '../contents/content-table';
import { DOMEditor } from 'slate-vue3/dom';
import { useInheritRef } from 'slate-vue3';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    insertTable: (rowCount: number, columnCount: number) => void;
    insertRow: (tablePath: Path, cellPath: Path, isNext?: boolean) => void;
    insertRowAbove: (tablePath: Path, cellPath: Path) => void;
    insertRowBelow: (tablePath: Path, cellPath: Path) => void;
    insertColumn: (tablePath: Path, cellPath: Path, isNext?: boolean) => void;
    insertColumnLeft: (tablePath: Path, cellPath: Path) => void;
    insertColumnRight: (tablePath: Path, cellPath: Path) => void;
    deleteRow: (tablePath: Path, cellPath: Path) => void;
    deleteColumn: (tablePath: Path, cellPath: Path) => void;
    deleteTable: (tablePath: Path) => void;
    moveToHead: (tablePath: Path, cellPath: Path) => void;
    moveToBody: (tablePath: Path, cellPath: Path) => void;
    isTable: (node: any) => node is TableElement;
    isTableCell: (node: any) => node is TableCellElement;
  }
}

function isTable(node: any): node is TableElement {
  return Element.isElementType(node, 'table');
}

function isTableHead(node: any): node is TableBodyElement {
  return Element.isElementType(node, 'table-head');
}

function isTableBody(node: any): node is TableBodyElement {
  return Element.isElementType(node, 'table-body');
}

function isTableRow(node: any): node is TableRowElement {
  return Element.isElementType(node, 'table-row');
}

function isTableCell(node: any): node is TableCellElement {
  return Element.isElementType(node, 'table-cell');
}

function createTableCell(): TableCellElement {
  return {
    type: 'table-cell',
    children: [{ text: '' }],
  };
}

function createTableRow(cellCount: number): TableRowElement {
  return {
    type: 'table-row',
    children: Array(cellCount).fill(0).map(createTableCell),
  };
}

function insertTable(editor: Editor, rowCount: number, columnCount: number) {
  if (!editor.selection) return;

  const generator = editor.nodes({
    at: editor.selection,
    mode: 'lowest',
    match(n, path) {
      return (
        isBlockElement(editor, n) &&
        isEdgesEqual(editor.edges(path), editor.edges(editor.selection!))
      );
    },
  });

  const { done, value } = generator.next();

  const shouldRemoveNode = !done;

  const table: Node = {
    type: 'table',
    children: [
      {
        type: 'table-body',
        children: Array(rowCount)
          .fill(0)
          .map(() => createTableRow(columnCount)),
      },
    ],
  };
  const nodes: Node[] = [table];

  const after = editor.after(editor.selection);
  if (!after) {
    nodes.push({
      type: 'paragraph',
      children: [{ text: '' }],
    });
  }

  editor.insertNodes(nodes);

  if (shouldRemoveNode) {
    editor.removeNodes({
      at: value[1],
    });
  }
}

function insertRow(editor: Editor, _tablePath: Path, cellPath: Path, isNext?: boolean) {
  const rowPath = Path.parent(cellPath);
  const rowNode = editor.node(rowPath)[0] as TableRowElement;
  const columns = rowNode.children.length;

  editor.insertNodes(createTableRow(columns), {
    at: isNext ? Path.next(rowPath) : rowPath,
  });
}

function insertRowAbove(editor: Editor, tablePath: Path, cellPath: Path) {
  insertRow(editor, tablePath, cellPath);
}

function insertRowBelow(editor: Editor, tablePath: Path, cellPath: Path) {
  insertRow(editor, tablePath, cellPath, true);
}

function insertColumn(editor: Editor, tablePath: Path, cellPath: Path, isNext?: boolean) {
  const tableNode = editor.node(tablePath)[0] as TableElement;
  const bodyIndex = tableNode.children.findIndex(isTableBody);
  const headIndex = tableNode.children.findIndex(isTableHead);
  const cellIndex = cellPath[cellPath.length - 1] + (isNext ? 1 : 0);

  function insertNodes(node: TableBodyElement | TableHeadElement) {
    node.children.forEach((row) => {
      const rowPath = DOMEditor.findPath(editor, row);
      editor.insertNodes(createTableCell(), {
        at: [...rowPath, cellIndex],
      });
    });
  }

  if (bodyIndex !== -1) {
    const bodyPath = [...tablePath, bodyIndex];
    const bodyNode = editor.node(bodyPath)[0] as TableBodyElement;
    insertNodes(bodyNode);
  }

  if (headIndex !== -1) {
    const headPath = [...tablePath, headIndex];
    const headNode = editor.node(headPath)[0] as TableHeadElement;
    insertNodes(headNode);
  }
}

function insertColumnLeft(editor: Editor, tablePath: Path, cellPath: Path) {
  insertColumn(editor, tablePath, cellPath);
}

function insertColumnRight(editor: Editor, tablePath: Path, cellPath: Path) {
  insertColumn(editor, tablePath, cellPath, true);
}

function deleteRow(editor: Editor, tablePath: Path, cellPath: Path) {
  const rowPath = Path.parent(cellPath);
  editor.removeNodes({
    at: rowPath,
  });

  const tableNode = editor.node(tablePath)[0] as TableElement;

  const bodyIndex = tableNode.children.findIndex(isTableBody);
  if (bodyIndex !== -1) {
    const bodyPath = [...tablePath, bodyIndex];
    const bodyNode = editor.node(bodyPath)[0] as TableBodyElement;
    if (!bodyNode.children.find(isTableRow)) {
      editor.removeNodes({
        at: bodyPath,
      });
    }
  }

  const headIndex = tableNode.children.findIndex(isTableHead);
  if (headIndex !== -1) {
    const headPath = [...tablePath, headIndex];
    const headNode = editor.node(headPath)[0] as TableBodyElement;
    if (!headNode.children.find(isTableRow)) {
      editor.removeNodes({
        at: headPath,
      });
    }
  }

  if (!tableNode.children.find((node) => isTableHead(node) || isTableBody(node))) {
    editor.removeNodes({
      at: tablePath,
    });
  }
}

function deleteColumn(editor: Editor, tablePath: Path, cellPath: Path) {
  const tableNode = editor.node(tablePath)[0] as TableElement;
  const rowPath = Path.parent(cellPath);
  const rowNode = editor.node(rowPath)[0] as TableRowElement;

  function removeNodes(node: TableBodyElement | TableHeadElement) {
    const cellIndex = cellPath[cellPath.length - 1];
    node.children.forEach((row) => {
      const rowPath = DOMEditor.findPath(editor, row);

      editor.removeNodes({
        at: [...rowPath, cellIndex],
      });
    });
  }

  if (rowNode.children.length === 1) {
    deleteTable(editor, tablePath);
  } else {
    const bodyIndex = tableNode.children.findIndex(isTableBody);
    if (bodyIndex !== -1) {
      const bodyPath = [...tablePath, bodyIndex];
      const bodyNode = editor.node(bodyPath)[0] as TableBodyElement;
      removeNodes(bodyNode);
    }

    const headIndex = tableNode.children.findIndex(isTableHead);
    if (headIndex !== -1) {
      const headPath = [...tablePath, headIndex];
      const headNode = editor.node(headPath)[0] as TableHeadElement;
      removeNodes(headNode);
    }
  }
}

function deleteTable(editor: Editor, tablePath: Path) {
  editor.removeNodes({
    at: tablePath,
  });
}

function moveToHead(editor: Editor, tablePath: Path, cellPath: Path) {
  const rowPath = Path.parent(cellPath);

  const rowParentPath = Path.parent(rowPath);
  const rowParentNode = editor.node(rowParentPath)[0] as TableHeadElement | TableBodyElement;
  if (rowParentNode.type === 'table-head') return;

  const tableNode = editor.node(tablePath)[0] as TableElement;

  editor.withoutNormalizing(() => {
    const rowPathRef = editor.pathRef(rowPath);
    let headIndex = tableNode.children.findIndex(isTableHead);
    if (headIndex === -1) {
      editor.insertNodes(
        {
          type: 'table-head',
          children: [],
        },
        { at: rowParentPath },
      );
    }

    headIndex = tableNode.children.findIndex(isTableHead);
    const headPath = [...tablePath, headIndex];
    const headNode = editor.node(headPath)[0] as TableHeadElement;
    const lastRowIndex = headNode.children.length;
    editor.moveNodes({
      at: rowPathRef.unref()!,
      to: [...headPath, lastRowIndex],
    });
  });

  const bodyIndex = tableNode.children.findIndex(isTableBody);
  const bodyPath = [...tablePath, bodyIndex];
  const bodyNode = editor.node(bodyPath)[0] as TableBodyElement;
  if (!bodyNode.children.find(isTableRow)) {
    editor.removeNodes({
      at: bodyPath,
    });
  }
}

function moveToBody(editor: Editor, tablePath: Path, cellPath: Path) {
  const rowPath = Path.parent(cellPath);

  const rowParentPath = Path.parent(rowPath);
  const rowParentNode = editor.node(rowParentPath)[0] as TableHeadElement | TableBodyElement;
  if (rowParentNode.type === 'table-body') return;

  const tableNode = editor.node(tablePath)[0] as TableElement;

  editor.withoutNormalizing(() => {
    const rowPathRef = editor.pathRef(rowPath);
    let bodyIndex = tableNode.children.findIndex(isTableBody);
    if (bodyIndex === -1) {
      editor.insertNodes(
        {
          type: 'table-body',
          children: [],
        },
        { at: Path.next(rowParentPath) },
      );
    }

    bodyIndex = tableNode.children.findIndex(isTableBody);
    const bodyPath = [...tablePath, bodyIndex];
    editor.moveNodes({
      at: rowPathRef.unref()!,
      to: [...bodyPath, 0],
    });
  });

  const headIndex = tableNode.children.findIndex(isTableHead);
  const headPath = [...tablePath, headIndex];
  const headNode = editor.node(headPath)[0] as TableBodyElement;
  if (!headNode.children.find(isTableRow)) {
    editor.removeNodes({
      at: headPath,
    });
  }
}

/**
 * 避免删除 table-cell
 */
function deleteBackward(editor: Editor) {
  if (editor.selection && Range.isCollapsed(editor.selection)) {
    const generator = editor.nodes({
      match: isTableCell,
    });
    const { value: cell, done } = generator.next();

    if (!done) {
      const [, cellPath] = cell;
      const start = Editor.start(editor, cellPath);

      if (Point.equals(editor.selection.anchor, start)) {
        return true;
      }
    } else {
      const generator = editor.nodes({
        at: editor.before(editor.selection.anchor),
        match: isTable,
      });

      if (!generator.next().done) {
        return true;
      }
    }
  }
}

/**
 * 避免删除 table-cell
 */
function deleteForward(editor: Editor) {
  if (editor.selection && Range.isCollapsed(editor.selection)) {
    const generator = editor.nodes({
      match: isTableCell,
    });

    const { value: cell, done } = generator.next();

    if (!done) {
      const [, cellPath] = cell;
      const end = editor.end(cellPath);

      if (Point.equals(editor.selection.anchor, end)) {
        return true;
      }
    } else {
      const generator = editor.nodes({
        at: editor.after(editor.selection.anchor),
        match: isTable,
      });

      if (!generator.next().done) {
        const [[node, path]] = editor.nodes({
          at: editor.selection,
          mode: 'lowest',
          match: (n) => isBlockElement(editor, n),
        });

        if (editor.isEmpty(node)) {
          editor.removeNodes({
            at: path,
          });
        }

        return true;
      }
    }
  }
}

interface RangeItem {
  type: 'table' | 'non-table';
  full?: boolean;
  range: Range;
}

function getSplitedTableRange(editor: Editor) {
  const tableEntries = Array.from(
    editor.nodes({
      match: isTable,
    }),
  );

  const ranges = tableEntries.reduce((ranges, current) => {
    const [tableStart, tableEnd] = Range.edges(editor.range(current[1]));

    const prev = ranges[ranges.length - 1];
    if (prev) {
      ranges.push({
        type: 'non-table',
        range: {
          anchor: editor.after(prev.range.focus)!,
          focus: editor.before(tableStart)!,
        },
      });
    }
    ranges.push({
      type: 'table',
      full: true,
      range: {
        anchor: tableStart,
        focus: tableEnd,
      },
    });
    return ranges;
  }, [] as RangeItem[]);

  const [selectionStart, selectionEnd] = Range.edges(editor.selection!);

  const firstRange = ranges[0].range;
  if (Point.isBefore(selectionStart, firstRange.anchor)) {
    ranges.unshift({
      type: 'non-table',
      range: {
        anchor: selectionStart,
        focus: editor.before(firstRange.anchor)!,
      },
    });
  } else {
    ranges[0].full = false;
    firstRange.anchor = selectionStart;
  }

  const lastRange = ranges[ranges.length - 1].range;
  if (Point.isAfter(selectionEnd, lastRange.focus)) {
    ranges.push({
      type: 'non-table',
      range: {
        anchor: editor.after(lastRange.focus)!,
        focus: selectionEnd,
      },
    });
  } else {
    ranges[ranges.length - 1].full = false;
    lastRange.focus = selectionEnd;
  }

  return ranges;
}

function clearTableCells(editor: Editor, range: Range) {
  const cellEntries = Array.from(
    editor.nodes({
      at: range,
      match: isTableCell,
    }),
  );

  const [start, end] = editor.edges(editor.selection!);

  for (const [, path] of cellEntries) {
    const [cellStart, cellEnd] = editor.edges(path);

    const anchor = Point.isBefore(start, cellStart) ? cellStart : start;
    const focus = Point.isAfter(end, cellEnd) ? cellEnd : end;

    if (Point.equals(anchor, focus)) {
      continue;
    }

    editor.delete({
      at: {
        anchor,
        focus,
      },
    });
  }
}

/**
 * fix: 表格位于文档最后，无法插入换行符。
 */
/**
 * 1. anchor 和 focus 光标都不在表格上面，走默认流程
 * 2. anchor 和 focus 位于同一个单元格，走默认流程
 * 3. 使用表格范围分割选区
 *   a. 删除非表格区域、完全覆盖的表格
 *   b. 非完全覆盖表格则删除与选区相交的单元格内容
 */
function deleteFragment(editor: Editor) {
  if (!editor.selection) return;

  const [anchorCell] = editor.nodes({ at: editor.selection.anchor, match: isTableCell });
  const [focusCell] = editor.nodes({ at: editor.selection.focus, match: isTableCell });

  if (!anchorCell && !focusCell) return;

  if (anchorCell && focusCell && Path.equals(anchorCell[1], focusCell[1])) return;

  const ranges = getSplitedTableRange(editor);

  // 倒序删除，避免改变 location
  for (let i = ranges.length - 1; i >= 0; i--) {
    const { type, full, range } = ranges[i];

    if (Range.isCollapsed(range)) continue;

    if (type === 'non-table') {
      editor.delete({
        at: range,
      });
    } else if (full) {
      editor.delete({
        at: {
          anchor: editor.before(range.anchor)!,
          focus: editor.after(range.focus)!,
        },
      });
    } else {
      clearTableCells(editor, range);
    }
  }

  return true;
}

function wrapTableCellChildren(editor: Editor, cellPath: Path) {
  const children = Array.from(Node.children(editor, cellPath));

  for (const [childNode, childPath] of children) {
    if (!Element.isElement(childNode) || editor.isInline(childNode)) {
      editor.wrapNodes(
        {
          type: 'paragraph',
          children: [],
        },
        {
          at: childPath,
        },
      );

      return true;
    }
  }
}

/**
 * 折叠选区：
 *   1. 走默认流程
 * 扩展选区：
 *   1. anchor 和 focus 光标都不在表格上面，走默认流程
 *   2. anchor 和 focus 位于同一个单元格，走默认流程
 *   3. 选区与表格相交，阻止默认行为
 */
function insertBreak(editor: Editor) {
  if (!editor.selection || Range.isCollapsed(editor.selection)) return;

  const [anchorCell] = editor.nodes({ at: editor.selection.anchor, match: isTableCell });
  const [focusCell] = editor.nodes({ at: editor.selection.focus, match: isTableCell });

  if (!anchorCell && !focusCell) return;

  if (anchorCell && focusCell && Path.equals(anchorCell[1], focusCell[1])) return;

  return true;
}

function onKeydown(editor: Editor, event: KeyboardEvent) {
  if (Hotkeys.isMoveDown(event)) {
    if (editor.selection) {
      const [cell] = editor.nodes({
        match: isTableCell,
        at: editor.selection.focus,
      });

      if (!cell) return;

      const cellPath = cell[1];

      if (isPointAtLastLine(editor, cellPath, editor.selection.focus)) {
        event.preventDefault();

        const cellIndex = cellPath[cellPath.length - 1];

        const [[, tablePath]] = editor.nodes({
          at: cellPath,
          match: isTable,
        });

        const [, rowPath] = editor.parent(cellPath);
        const maybeNextRow = editor.next({
          at: rowPath,
          match: (n, path) => isTableRow(n) && Path.isAncestor(tablePath, path),
        });
        if (maybeNextRow) {
          const nextRowCellPath = [...maybeNextRow[1], cellIndex];
          editor.select(editor.start(nextRowCellPath));
        } else {
          const after = editor.after(tablePath);
          if (after) {
            editor.select(after);
          } else {
            editor.insertNodes(
              {
                type: 'paragraph',
                children: [{ text: '' }],
              },
              {
                at: Path.next(tablePath),
              },
            );
            editor.select(Path.next(tablePath));
          }
        }
      }

      return true;
    }
  }
  if (Hotkeys.isMoveUp(event)) {
    if (editor.selection) {
      const [cell] = editor.nodes({
        match: isTableCell,
        at: editor.selection.focus,
      });

      if (!cell) return;

      const cellPath = cell[1];

      if (isPointAtFirstLine(editor, cellPath, editor.selection.focus)) {
        event.preventDefault();

        const cellIndex = cellPath[cellPath.length - 1];

        const [[, tablePath]] = editor.nodes({
          at: cellPath,
          match: isTable,
        });

        const [, rowPath] = editor.parent(cellPath);
        const maybeNextRow = editor.previous({
          at: rowPath,
          match: (n, path) => isTableRow(n) && Path.isAncestor(tablePath, path),
        });
        if (maybeNextRow) {
          const nextRowCellPath = [...maybeNextRow[1], cellIndex];
          editor.select(editor.end(nextRowCellPath));
        } else {
          const before = editor.before(tablePath);
          if (before) {
            editor.select(before);
          } else {
            editor.insertNodes(
              {
                type: 'paragraph',
                children: [{ text: '' }],
              },
              {
                at: [0],
              },
            );
            editor.select([0]);
          }
        }
      }

      return true;
    }
  }
}

function normalizeTable(editor: Editor, entry: NodeEntry<Node>) {
  const [node, path] = entry;

  if (!isTable(node)) return;

  const children = Array.from(Node.children(editor, path));

  for (const [childNode, childPath] of children) {
    if (!isTableHead(childNode) && !isTableBody(childNode)) {
      editor.removeNodes({
        at: childPath,
      });

      return true;
    }
  }
}

function normalizeTableHead(editor: Editor, entry: NodeEntry<Node>) {
  const [node, path] = entry;

  if (!isTableHead(node)) return;

  const children = Array.from(Node.children(editor, path));

  for (const [childNode, childPath] of children) {
    if (!isTableRow(childNode)) {
      editor.removeNodes({
        at: childPath,
      });

      return true;
    }
  }
}

function normalizeTableBody(editor: Editor, entry: NodeEntry<Node>) {
  const [node, path] = entry;

  if (!isTableBody(node)) return;

  const children = Array.from(Node.children(editor, path));

  for (const [childNode, childPath] of children) {
    if (!isTableRow(childNode)) {
      editor.removeNodes({
        at: childPath,
      });

      return true;
    }
  }
}

function normalizeTableRow(editor: Editor, entry: NodeEntry<Node>) {
  const [node, path] = entry;

  if (!isTableRow(node)) return;

  const children = Array.from(Node.children(editor, path));

  for (const [childNode, childPath] of children) {
    if (!isTableCell(childNode)) {
      editor.removeNodes({
        at: childPath,
      });

      return true;
    }
  }
}

function normalizeTableCell(editor: Editor, entry: NodeEntry<Node>) {
  const [node, path] = entry;

  if (!isTableCell(node)) return;

  return wrapTableCellChildren(editor, path);
}

function normalizeNode(editor: Editor, entry: NodeEntry<Node>) {
  return (
    normalizeTable(editor, entry) ||
    normalizeTableHead(editor, entry) ||
    normalizeTableBody(editor, entry) ||
    normalizeTableRow(editor, entry) ||
    normalizeTableCell(editor, entry)
  );
}

/**
 * 1. anchor 和 focus 光标都不在表格上面，走默认流程
 * 2. anchor 和 focus 位于同一个单元格，走默认流程
 * 3. 其他情况则阻止默认行为
 */
function insertData(editor: Editor) {
  if (!editor.selection) return;

  const [anchorCell] = editor.nodes({ at: editor.selection.anchor, match: isTableCell });
  const [focusCell] = editor.nodes({ at: editor.selection.focus, match: isTableCell });

  if (!anchorCell && !focusCell) return;

  if (anchorCell && focusCell && Path.equals(anchorCell[1], focusCell[1])) return;

  return true;
}

export function withTable(editor: Editor) {
  const {
    renderElement,
    deleteBackward: srcDeleteBackward,
    deleteForward: srcDeleteForward,
    deleteFragment: srcDeleteFragment,
    insertBreak: srcInsertBreak,
    onKeydown: srcOnKeydown,
    normalizeNode: srcNormalizeNode,
    insertData: srcInsertData,
  } = editor;

  editor.renderElement = (props) => {
    const { attributes, children, element } = props;

    switch (element.type) {
      case 'table': {
        return h(ContentTable, useInheritRef(attributes), () => children);
      }
      case 'table-head':
        return h('thead', attributes, children);
      case 'table-body':
        return h('tbody', attributes, children);
      case 'table-row':
        return h('tr', attributes, children);
      case 'table-cell':
        return h('td', attributes, children);
    }

    return renderElement(props);
  };

  editor.deleteBackward = (unit) => {
    if (!deleteBackward(editor)) {
      srcDeleteBackward(unit);
    }
  };

  editor.deleteForward = (unit) => {
    if (!deleteForward(editor)) {
      srcDeleteForward(unit);
    }
  };

  editor.deleteFragment = (options) => {
    if (!deleteFragment(editor)) {
      srcDeleteFragment(options);
    }
  };

  editor.insertBreak = () => {
    if (!insertBreak(editor)) {
      srcInsertBreak();
    }
  };

  editor.onKeydown = (event) => {
    if (!onKeydown(editor, event)) {
      srcOnKeydown(event);
    }
  };

  editor.insertTable = (rowCount: number, columnCount: number) => {
    insertTable(editor, rowCount, columnCount);
  };

  editor.insertRow = (tablePath: Path, cellPath: Path, isNext?: boolean) => {
    insertRow(editor, tablePath, cellPath, isNext);
  };

  editor.insertRowAbove = (tablePath: Path, cellPath: Path) => {
    insertRowAbove(editor, tablePath, cellPath);
  };

  editor.insertRowBelow = (tablePath: Path, cellPath: Path) => {
    insertRowBelow(editor, tablePath, cellPath);
  };

  editor.insertColumn = (tablePath: Path, cellPath: Path, isNext?: boolean) => {
    insertColumn(editor, tablePath, cellPath, isNext);
  };

  editor.insertColumnLeft = (tablePath: Path, cellPath: Path) => {
    insertColumnLeft(editor, tablePath, cellPath);
  };

  editor.insertColumnRight = (tablePath: Path, cellPath: Path) => {
    insertColumnRight(editor, tablePath, cellPath);
  };

  editor.deleteRow = (tablePath: Path, cellPath: Path) => {
    deleteRow(editor, tablePath, cellPath);
  };

  editor.deleteColumn = (tablePath: Path, cellPath: Path) => {
    deleteColumn(editor, tablePath, cellPath);
  };

  editor.deleteTable = (tablePath: Path) => {
    deleteTable(editor, tablePath);
  };

  editor.moveToHead = (tablePath: Path, cellPath: Path) => {
    moveToHead(editor, tablePath, cellPath);
  };

  editor.moveToBody = (tablePath: Path, cellPath: Path) => {
    moveToBody(editor, tablePath, cellPath);
  };

  editor.isTable = isTable;
  editor.isTableCell = isTableCell;

  editor.normalizeNode = (entry, options) => {
    if (!normalizeNode(editor, entry)) {
      srcNormalizeNode(entry, options);
    }
  };

  editor.insertData = (data) => {
    if (!insertData(editor)) {
      srcInsertData(data);
    }
  };

  return editor;
}
