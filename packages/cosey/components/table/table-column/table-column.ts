import { type VNode, type ExtractPropTypes, type PropType } from 'vue';
import { type TableColumnCtx } from 'element-plus';
import elTableColumnProps from 'element-plus/es/components/table/src/table-column/defaults.mjs';
import { type RendererType } from './renderer';

export type TableColumnPropsSlots =
  | string
  | ((props: { row: any; column: any; $index: number }) => any)
  | {
      default?: string | ((props: { row: any; column: any; $index: number }) => any);
      header?: string | ((props: { column: any; $index: number }) => any);
      filterIcon?: string | ((props: { filterOpened: boolean }) => any);
    };

// 能用于递归
export type TableColumnProps<T = any> = Partial<
  Omit<ExtractPropTypes<typeof elTableColumnProps>, 'align' | 'tooltipFormatter'>
> & {
  slots?: TableColumnPropsSlots;
  renderer?: RendererType;
  hidden?: boolean;
  align?: 'left' | 'center' | 'right';
  columns?: TableColumnProps<T>[];
  internalSlot?: {
    [prop: string]: any;
  };
  tooltip?: string;
  format?: (cellValue: any, row: any, column: TableColumnCtx<any>, index: number) => VNode | string;
};

export const tableColumnProps = {
  ...elTableColumnProps,
  slots: {
    type: [String, Object, Function] as PropType<TableColumnProps['slots']>,
  },
  renderer: {
    type: [String, Object] as PropType<TableColumnProps['renderer']>,
    default: 'text',
  },
  hidden: {
    type: Boolean,
  },
  align: {
    type: String as PropType<TableColumnProps['align']>,
    default: 'left',
  },
  columns: {
    type: Array as PropType<TableColumnProps[]>,
  },
  internalSlot: {
    type: Object as PropType<TableColumnProps['internalSlot']>,
  },
  tooltip: {
    type: String,
  },
  format: {
    type: Function,
  },
};

export interface TableColumnSlots {
  default?: (props: { row: any; column: any; $index: number }) => any;
  header?: (props: { column: any; $index: number }) => any;
  'filter-icon'?: (props: { filterOpened: boolean }) => any;
}
