import {
  type FormItemInstance,
  type FormItemProps as ElFormItemProps,
  formItemProps as elFormItemProps,
} from 'element-plus';
import { type VNodeChild, type PropType } from 'vue';
import { type MapFieldTypeComponentProps, type FieldType } from '../field';
import { type ColProps } from '../col';

export type FormItemPresetWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type FormItemWidth = number | FormItemPresetWidth | (string & {});

export const mapFormItemWidth = {
  xs: 104,
  sm: 216,
  md: 328,
  lg: 440,
  xl: 552,
};

export interface FormItemProps<T extends FieldType> extends Partial<ElFormItemProps> {
  fieldType?: T;
  fieldProps?: MapFieldTypeComponentProps[T]['componentProps'];
  fieldSlots?: MapFieldTypeComponentProps[FieldType]['componentSlots'];
  fieldRef?: (el: any) => void;
  modelValue?: NonNullable<MapFieldTypeComponentProps[T]['componentProps']>['modelValue'] | null;
  width?: FormItemWidth;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  colProps?: ColProps;
  internalIndex?: number;
  tooltip?: VNodeChild;
  extra?: VNodeChild;
}

export const defaultFormItemProps = {
  showMessage: true,
  labelWidth: '',
  required: undefined,
  inlineMessage: '',
  disabled: false,
  readonly: false,
};

export const exlucdeFieldSlotNames = ['error', 'label', 'default', 'tooltip', 'extra'] as const;

type ExlucdeFieldSlotNames = (typeof exlucdeFieldSlotNames)[number];

type OptionExlucdeFieldSlotNames = `field-${ExlucdeFieldSlotNames}`;

export type ElFormItemSlots = {
  default?: (props: Record<string, any>) => any;
  label?: (props: { label: string }) => any;
  error?: (props: { error: string }) => any;
  tooltip?: (props: Record<string, any>) => any;
  extra?: (props: Record<string, any>) => any;
} & {
  [K in OptionExlucdeFieldSlotNames]?: (...args: any[]) => any;
};

export type FormItemSlots<T extends FieldType> = NonNullable<
  MapFieldTypeComponentProps[T]['componentSlots']
> &
  ElFormItemSlots;

export const formItemProps = {
  ...elFormItemProps,
  fieldType: {
    type: String as PropType<FieldType>,
    default: 'input',
  },
  fieldProps: {
    type: Object as PropType<MapFieldTypeComponentProps[FieldType]['componentProps']>,
  },
  fieldSlots: {
    type: Object as PropType<MapFieldTypeComponentProps[FieldType]['componentSlots']>,
  },
};

export const formItemPropsKeys = Object.keys(formItemProps);

export interface FormItemEmits {
  (e: 'update:modelValue', value: unknown): void;
}

const elFormItemExposeKeys = [
  'size',
  'validateMessage',
  'validateState',
  'validate',
  'resetField',
  'clearValidate',
];

export const formItemExposeKeys = [...elFormItemExposeKeys];

export interface FormItemExpose extends FormItemInstance {}
