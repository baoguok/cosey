import type { TableFooter } from '.';
import { useNamespace } from 'element-plus';
import { TableColumnCtx } from 'element-plus/es/components/index.mjs';
import { DefaultRow } from 'element-plus/es/components/table/src/table/defaults.mjs';
import { ensurePosition, getFixedColumnOffset, getFixedColumnsClass } from './utils';

function useStyle<T extends DefaultRow>(props: TableFooter<T>) {
  const ns = useNamespace('table');

  const getCellClasses = (columns: TableColumnCtx<T>[], cellIndex: number) => {
    const column = columns[cellIndex];
    const classes = [
      ns.e('cell'),
      column.id,
      column.align,
      column.labelClassName,
      ...getFixedColumnsClass(ns.b(), cellIndex, column.fixed, props.store),
    ];
    if (column.className) {
      classes.push(column.className);
    }
    if (!column.children) {
      classes.push(ns.is('leaf'));
    }
    return classes;
  };

  const getCellStyles = (column: TableColumnCtx<T>, cellIndex: number) => {
    const fixedStyle = getFixedColumnOffset(cellIndex, column.fixed, props.store);
    ensurePosition(fixedStyle, 'left');
    ensurePosition(fixedStyle, 'right');
    return fixedStyle;
  };

  return {
    getCellClasses,
    getCellStyles,
  };
}

export default useStyle;
