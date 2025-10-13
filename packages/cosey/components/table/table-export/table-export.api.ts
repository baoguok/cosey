import { type TableColumnProps } from '../table-column/table-column.api';
import { type ExtractPropTypes, type PropType } from 'vue';
import { formDialogEmits, formDialogProps } from '../../form-dialog';

const tableExportExtraProps = {
  columns: {
    type: Array as PropType<TableColumnProps[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  config: {
    type: [Boolean, Object] as PropType<
      | boolean
      | {
          filename: string;
        }
    >,
  },
  footerCount: {
    type: Number,
    default: 0,
  },
};

export const tableExportProps = {
  ...formDialogProps,
  ...tableExportExtraProps,
};

export const omittedTableExportProps = Object.keys(
  tableExportExtraProps,
) as unknown as keyof typeof tableExportProps;

export type TableExportProps = ExtractPropTypes<typeof tableExportProps>;

export const tableExportEmits = {
  ...formDialogEmits,
};

export type TableExportEmits = typeof tableExportEmits;

export interface TableExportContext {
  setCheckedByColumn: (column: TableColumnProps, checked: boolean) => void;
}

export const tableExportContextSymbol = Symbol('tableExportContext');
