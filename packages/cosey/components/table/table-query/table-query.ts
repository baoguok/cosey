import { type FieldType } from '../../field';
import { type FormItemProps, formExposeKeys } from '../../form';
import {
  type FormQuerySlots,
  type FormQueryEmits,
  type FormQueryExpose,
  formQueryProps,
} from '../../form-query';
import { type PropType, type ExtractPropTypes, VNodeChild } from 'vue';

export type TableQueryScheme = FormItemProps<FieldType> & {
  render?: (params: { model: Record<string, any> }) => VNodeChild;
  slots?: Record<string, unknown>;
};

const tableQueryExtraProps = {
  schemes: {
    type: Array as PropType<TableQueryScheme[]>,
    default: () => [],
  },
};

export const tableQueryProps = {
  ...formQueryProps,
  ...tableQueryExtraProps,
};

export const omittedTableQueryProps = Object.keys(
  tableQueryExtraProps,
) as unknown as keyof typeof tableQueryProps;

export type TableQueryProps = Partial<ExtractPropTypes<typeof tableQueryProps>>;

export interface TableQuerySlots extends FormQuerySlots {}

export interface TableQueryEmits extends /* @vue-ignore */ FormQueryEmits {}

export interface TableQueryCustomExpose {
  getFieldsValue: () => Record<string, any>;
  setFieldsValue: (value: Record<string, any>) => void;
  getFormModel: () => Record<string, any>;
}

export interface TableQueryExpose extends FormQueryExpose, TableQueryCustomExpose {}

export const tableQueryExposeKeys = [
  ...formExposeKeys,
  'getFieldsValue',
  'setFieldsValue',
  'getFormModel',
];

export function createScheme<T extends FieldType>(props: FormItemProps<T>) {
  return props;
}
