import { computed, mergeProps } from 'vue';
import { type TableExpose, type TableProps, tableExposeKeys } from './table';
import { createMergedExpose } from '../../utils';

export type UseTableProps = TableProps & { [prop: PropertyKey]: any };

export function useTable(props: UseTableProps): [UseTableProps, TableExpose] {
  let tableRef: TableExpose;

  const getExpose = (expose: TableExpose) => {
    tableRef = expose;
  };

  const mergedProps = computed(() => {
    return mergeProps(
      {
        getExpose,
      },
      props,
    );
  });

  const expose = createMergedExpose<TableExpose>(tableExposeKeys, () => tableRef);

  return [mergedProps, expose] as [UseTableProps, TableExpose];
}
