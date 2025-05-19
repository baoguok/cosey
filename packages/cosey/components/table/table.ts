import { TableColumnCtx, type PaginationProps } from 'element-plus';
import elTableProps from 'element-plus/es/components/table/src/table/defaults.mjs';
import { type PropType, type ExtractPropTypes } from 'vue';
import { type TableColumnProps } from './table-column/table-column';
import { omit } from 'lodash-es';
import {
  TableQueryExpose,
  tableQueryExposeKeys,
  type TableQueryProps,
} from './table-query/table-query';

export interface ToolbarConfig {
  reload?: boolean;
  export?: boolean;
  fullScreen?: boolean;
  setting?: boolean;
}

const tableExtraProps = {
  api: {
    type: Function as PropType<(...args: any[]) => Promise<any>>,
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  columns: {
    type: Array as PropType<TableColumnProps[]>,
    default: () => [],
  },
  actionColumn: {
    type: Object as PropType<TableColumnProps>,
  },
  pagination: {
    type: [Object, Boolean] as PropType<boolean | PaginationProps>,
    default: true,
  },
  getExpose: {
    type: Function as PropType<(expose: TableExpose) => void>,
  },
  formProps: {
    type: Object as PropType<TableQueryProps>,
  },
  beforeFetch: {
    type: Function as PropType<(params: Record<string, any>) => any>,
  },
  afterFetch: {
    type: Function as PropType<(res: any) => any>,
  },
  toolbarConfig: {
    type: [Object, Boolean] as PropType<ToolbarConfig | false>,
    default: () => ({
      reload: true,
      export: true,
      fullScreen: true,
      setting: true,
    }),
  },
  keys: {
    type: Object as PropType<TableConfig['keys']>,
  },
};

export const tableProps = {
  ...omit(elTableProps, 'style'),
  ...tableExtraProps,
};

export type TableProps = Partial<ExtractPropTypes<typeof tableProps>>;

export const omittedTableProps = Object.keys(tableExtraProps) as unknown as keyof typeof tableProps;

export interface TableSlots {
  default?: (props: Record<string, never>) => any;
  append?: (props: Record<string, never>) => any;
  empty?: (props: Record<string, never>) => any;
  'toolbar-left'?: (props: Record<string, never>) => any;
  'toolbar-right'?: (props: Record<string, never>) => any;
}

export const elSlotsName = ['default', 'append', 'empty'] as const;

type TableEmitEvents =
  | 'select-all'
  | 'expand-change'
  | 'current-change'
  | 'select'
  | 'selection-change'
  | 'cell-mouse-enter'
  | 'cell-mouse-leave'
  | 'cell-contextmenu'
  | 'cell-click'
  | 'cell-dblclick'
  | 'row-click'
  | 'row-contextmenu'
  | 'row-dblclick'
  | 'header-click'
  | 'header-contextmenu'
  | 'sort-change'
  | 'filter-change'
  | 'header-dragend';

export type TableEmits = (event: TableEmitEvents, ...args: any[]) => void;

export const defaultPaginationProps = {
  layout: 'prev, pager, next, sizes, jumper, total',
};

export interface TableCustomExpose {
  reload: () => void;
  expandAll: () => void;
  collapseAll: () => void;
}

export type TableExpose = TableCustomExpose &
  TableQueryExpose & {
    clearSelection: () => void;
    getSelectionRows: () => any[];
    toggleRowSelection: (
      row: any,
      selected?: boolean,
      emitChange?: boolean,
      ignoreSelectable?: boolean,
    ) => void;
    toggleAllSelection: () => void;
    toggleRowExpansion: (row: any, expanded?: boolean) => void;
    setCurrentRow: (row: any) => void;
    clearSort: () => void;
    clearFilter: (columnKeys: any) => void;
    doLayout: () => void;
    sort: (prop: string, order: string) => void;
    scrollTo: (options: number | ScrollToOptions, yCoord?: number) => void;
    setScrollTop: (top?: number) => void;
    setScrollLeft: (left?: number) => void;
    columns: TableColumnCtx<any>[];
    updateKeyChildren: (key: string, data: any[]) => void;
  };

const elTableExposeKeys = [
  'clearSelection',
  'getSelectionRows',
  'toggleRowSelection',
  'toggleAllSelection',
  'toggleRowExpansion',
  'setCurrentRow',
  'clearSort',
  'clearFilter',
  'doLayout',
  'sort',
  'scrollTo',
  'setScrollTop',
  'setScrollLeft',
  'columns',
  'updateKeyChildren',
];

export const tableExposeKeys = [
  ...elTableExposeKeys,
  ...tableQueryExposeKeys,
  'reload',
  'expandAll',
  'collapseAll',
];

export const defaultTableConfig = {
  keys: {
    /**
     * 响应数据对象中“列表数据”的 key
     */
    list: 'list',

    /**
     * 响应数据对象中“总记录数”的 key
     */
    total: 'total',

    /**
     * 请求url查询参数中“当前页数”的参数名
     */
    page: 'page',

    /**
     * 请求url查询参数中“每页条数”的参数名
     */
    pageSize: 'pageSize',

    /**
     * 请求url查询参数中“排序列”的参数名
     */
    orderBy: 'orderBy',

    /**
     * 请求url查询参数中“排序方向”的参数名
     */
    orderType: 'orderType',

    /**
     * 排序方向中“升序”的值
     */
    asc: 'asc',

    /**
     * 排序方向中“降序”的值
     */
    desc: 'desc',
  },
};

export interface TableConfig {
  keys?: {
    list?: string;
    total?: string;
    page?: string;
    pageSize?: string;
    orderBy?: string;
    orderType?: string;
    asc?: string;
    desc?: string;
  };
}
