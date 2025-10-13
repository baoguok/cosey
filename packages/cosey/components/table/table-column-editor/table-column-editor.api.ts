import type { ExtractPropTypes, PropType } from 'vue';
import type { TableColumnProps } from '../table-column/table-column.api';

export const tableColumnEditorProps = {
  modelValue: {
    type: Array as PropType<TableColumnProps[]>,
    default: () => [],
  },
  virtualRef: {
    type: null,
  },
};

export type TableColumnEditorProps = ExtractPropTypes<typeof tableColumnEditorProps>;

export const tableColumnEditorEmits = {
  'update:modelValue': (value: TableColumnProps[]) => Array.isArray(value),
  reset: () => true,
};

export type TableColumnEditorEmits = typeof tableColumnEditorEmits;
