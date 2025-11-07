import { h } from 'vue';
import { Element, Point, Editor, Range, Node, Path } from 'slate-vue3/core';
import {
  getRangePosition,
  getSortedRange,
  isPointAtFirstLine,
  isPointAtLastLine,
  RangePosition,
} from '../utils';
import { Hotkeys } from './keyboard';
import {
  type TableElement,
  type TableCellElement,
  type TableRowElement,
  type TableBodyElement,
  type TableHeadElement,
} from '../types';
import { TableComponent } from '../table-component';
import { DOMEditor } from 'slate-vue3/dom';

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
    isTableCell: (node: any) => node is TableCellElement;
  }
}

function isTable(node: any): node is TableElement {
  return Element.isElementType(node, 'table');
}

function isTableRow(node: any): node is TableRowElement {
  return Element.isElementType(node, 'table-row');
}

function isTableCell(node: any): node is TableCellElement {
  return Element.isElementType(node, 'table-cell');
}

function isTableBody(node: any): node is TableBodyElement {
  return Element.isElementType(node, 'table-body');
}

function isTableHead(node: any): node is TableBodyElement {
  return Element.isElementType(node, 'table-head');
}

function insertTable(editor: Editor, rowCount: number, columnCount: number) {
  const table: Node = {
    type: 'table',
    children: [
      {
        type: 'table-body',
        children: Array(rowCount)
          .fill(0)
          .map(() => {
            return {
              type: 'table-row',
              children: Array(columnCount)
                .fill(0)
                .map(() => {
                  return {
                    type: 'table-cell',
                    children: [{ text: '' }],
                  };
                }),
            };
          }),
      },
    ],
  };
  editor.insertNodes(table);
}

function insertRow(editor: Editor, _tablePath: Path, cellPath: Path, isNext?: boolean) {
  const rowPath = Path.parent(cellPath);
  const rowNode = editor.node(rowPath)[0] as TableRowElement;
  const columns = rowNode.children.length;

  editor.insertNodes(
    {
      type: 'table-row',
      children: Array(columns)
        .fill(0)
        .map(() => {
          return {
            type: 'table-cell',
            children: [{ text: '' }],
          };
        }),
    },
    {
      at: isNext ? Path.next(rowPath) : rowPath,
    },
  );
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
      editor.insertNodes(
        {
          type: 'table-cell',
          children: [{ text: '' }],
        },
        {
          at: [...rowPath, cellIndex],
        },
      );
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

function deleteBackward(editor: Editor) {
  if (editor.selection && Range.isCollapsed(editor.selection)) {
    const [cell] = editor.nodes({
      match: isTableCell,
    });
    if (cell) {
      const [, cellPath] = cell;
      const start = Editor.start(editor, cellPath);

      if (Point.equals(editor.selection.anchor, start)) {
        return true;
      }
    }
  }
}

function deleteForward(editor: Editor) {
  if (editor.selection && Range.isCollapsed(editor.selection)) {
    const [cell] = editor.nodes({
      match: isTableCell,
    });

    if (cell) {
      const [, cellPath] = cell;
      const end = Editor.end(editor, cellPath);

      if (Point.equals(editor.selection.anchor, end)) {
        return true;
      }
    }
  }
}

function deleteFragment(editor: Editor) {
  if (editor.selection) {
    const [table] = editor.nodes({
      match: isTable,
    });
    if (table) {
      const [, tablePath] = table;
      const tableRange = Editor.range(editor, tablePath);
      const pos = getRangePosition(tableRange, getSortedRange(editor.selection));

      if (pos !== RangePosition.COVER_BOTH) {
        const [start, end] = Range.edges(editor.selection);
        const [tableStart, tableEnd] = Range.edges(tableRange);

        if (Point.isBefore(start, tableStart)) {
          const anchor = start;
          const focus = Editor.before(editor, tableStart)!;
          if (!Point.equals(anchor, focus)) {
            editor.delete({ at: { anchor, focus } });
          }
        } else if (Point.isAfter(end, tableEnd)) {
          const anchor = Editor.after(editor, tableEnd)!;
          const focus = end;
          if (!Point.equals(anchor, focus)) {
            editor.delete({ at: { anchor, focus } });
          }
        }

        const cells = Array.from(
          editor.nodes({
            match: isTableCell,
          }),
        );
        for (const [, cellPath] of cells) {
          const cellRange = Editor.range(editor, cellPath);
          const range = Range.intersection(cellRange, editor.selection);
          if (range) {
            if (Range.isCollapsed(range)) {
              continue;
            }

            editor.delete({
              at: range,
            });
          }
        }

        return true;
      }
    }
  }
}

function insertBreak(editor: Editor) {
  if (editor.selection) {
    const [table] = editor.nodes({
      match: isTable,
    });
    if (table) {
      return true;
    }
  }
}

function onKeydown(editor: Editor, event: KeyboardEvent) {
  if (Hotkeys.isMoveDown(event)) {
    if (editor.selection) {
      const [cell] = editor.nodes({
        match: isTableCell,
        at: editor.selection.focus,
      });
      if (cell) {
        event.preventDefault();
        const cellPath = cell[1];
        if (
          isPointAtLastLine(editor, cellPath, editor.selection.focus, () => {
            const cellIndex = cellPath[cellPath.length - 1];

            const [, rowPath] = editor.parent(cellPath);
            const maybeNextRow = editor.next({
              at: rowPath,
            });
            if (maybeNextRow && isTableRow(maybeNextRow[0])) {
              const nextRowCellPath = [...maybeNextRow[1], cellIndex];
              editor.select(editor.end(nextRowCellPath));
              return true;
            }
          })
        ) {
          event.preventDefault();
          return true;
        }
      }
    }
  }
  if (Hotkeys.isMoveUp(event)) {
    if (editor.selection) {
      const [cell] = editor.nodes({
        match: isTableCell,
        at: editor.selection.focus,
      });
      if (cell) {
        event.preventDefault();
        const cellPath = cell[1];
        if (
          isPointAtFirstLine(editor, cellPath, editor.selection.focus, () => {
            const cellIndex = cellPath[cellPath.length - 1];

            const [, rowPath] = editor.parent(cellPath);
            const maybeNextRow = editor.previous({
              at: rowPath,
            });
            if (maybeNextRow && isTableRow(maybeNextRow[0])) {
              const nextRowCellPath = [...maybeNextRow[1], cellIndex];
              editor.select(editor.end(nextRowCellPath));
              return true;
            }
          })
        ) {
          event.preventDefault();
          return true;
        }
      }
    }
  }
}

export function withTable(editor: Editor) {
  const {
    renderElement,
    deleteBackward: srcDeleteBackward,
    deleteForward: srcDeleteForward,
    insertBreak: srcInsertBreak,
    deleteFragment: srcDeleteFragment,
    onKeydown: srcOnKeydown,
  } = editor;

  editor.renderElement = (props) => {
    const { attributes, children, element } = props;

    switch (element.type) {
      case 'table':
        return h(TableComponent, attributes, () => children);
      case 'table-head':
        return h('thead', attributes, children);
      case 'table-body':
        return h('tbody', attributes, children);
      case 'table-row':
        return h('tr', attributes, children);
      case 'table-cell':
        return h(
          'td',
          {
            ...attributes,
            style: {
              textAlign: element.align,
            },
          },
          children,
        );
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

  editor.isTableCell = isTableCell;

  return editor;
}
