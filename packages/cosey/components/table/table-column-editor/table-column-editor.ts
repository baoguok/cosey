import { type TableColumnProps } from '../table-column/table-column.api';

export interface TableColumnEditorProps {
  modelValue?: TableColumnProps[];
  virtualRef?: any;
}

export const defaultTableColumnEditorProps = {
  modelValue: () => [],
};

export interface TableColumnEditorEmits {
  (e: 'update:modelValue', value: TableColumnProps[]): void;
  (e: 'reset'): void;
}
