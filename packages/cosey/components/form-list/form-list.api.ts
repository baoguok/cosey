import { type PropType, type SlotsType } from 'vue';
import {
  type ElFormItemSlots,
  type FormItemExpose,
  type FormItemProps,
  type FormItemWidth,
  defaultFormItemProps,
  formItemExposeKeys,
  formItemProps,
} from '../form';

export type FormListRow = Record<string, any>;

export interface FormListColumn {
  label?: string;
  width?: FormItemWidth;
  required?: boolean;
}

export const formListProps = {
  ...formItemProps,
  defaultValue: {
    type: Object,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  addText: {
    type: String,
    default: 'co.common.add',
  },
  columns: {
    type: Array as PropType<FormListColumn[]>,
  },
  draggable: {
    type: Boolean,
  },
};

export const defaultFormListProps = {
  ...defaultFormItemProps,
  modelValue: () => [],
  addText: 'co.common.add',
};

export interface FormListProps<T = FormListRow> extends Omit<FormItemProps<'input'>, 'modelValue'> {
  defaultValue?: T;
  modelValue?: T[];
  min?: number;
  max?: number;
  addText?: string;
  columns?: FormListColumn[];
  draggable?: boolean;
}

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

export const formListSlots = Object as SlotsType<FormListSlots>;

export const formListEmits = {
  'update:modelValue': (value: any[]) => value || true,
};

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
