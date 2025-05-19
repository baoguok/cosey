import {
  type FormItemProps,
  type ElFormItemSlots,
  type FormItemExpose,
  type FormItemWidth,
  defaultFormItemProps,
  formItemExposeKeys,
} from '../form';

export type FormListRow = Record<string, any>;

export interface FormListColumn {
  label?: string;
  width?: FormItemWidth;
  required?: boolean;
}

export interface FormListProps<T = FormListRow> extends Omit<FormItemProps<'input'>, 'modelValue'> {
  defaultValue?: T;
  min?: number;
  max?: number;
  modelValue?: T[];
  addText?: string;
  columns?: FormListColumn[];
  draggable?: boolean;
}

export const defaultFormListProps = {
  ...defaultFormItemProps,
  modelValue: () => [],
  addText: '新增',
};

export interface FormListSlots<T = FormListRow> extends Omit<ElFormItemSlots, 'default'> {
  default?: (props: {
    row: T;
    index: number;
    getProp: (...args: (string | number)[]) => string[];
  }) => any;
  custom?: (
    props: {
      list: T[];
      getProp: (...args: (string | number)[]) => string[];
      getKey: (row: T) => string;
    } & FormListAction<T>,
  ) => any;
}

export interface FormListEmits<T = FormListRow> {
  (e: 'update:modelValue', value: T[]): void;
}

export interface FormListAction<T = FormListRow> {
  add: (row?: T, index?: number) => void;
  remove: (index: number) => void;
  move: (fromIndex: number, toIndex: number) => void;
}

export interface FormListExpose<T = FormListRow> extends FormItemExpose, FormListAction<T> {}

export const formListExposeKeys = [...formItemExposeKeys, 'add', 'remove', 'move'];

export interface FormListGuards<T = FormListRow> {
  beforeAdd: (defaultValue: T, index: number, count: number) => Promise<any> | any;
  beforeRemove: (index: number, count: number) => Promise<boolean> | boolean;
}

export interface FormListContext {}
