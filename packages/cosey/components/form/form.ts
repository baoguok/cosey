import {
  type FormEmits as ElFormEmits,
  formProps as elFormProps,
  type ButtonProps,
  FormItemProp,
  FormValidateCallback,
  FormValidationResult,
  FormItemContext,
} from 'element-plus';
import { ExtractPropTypes, type EmitFn, type PropType } from 'vue';
import { type RowProps } from '../row';
import { type ColProps } from '../col';
import { type FormItemWidth } from './form-item';
import { Arrayable } from '@vueuse/core';

export const formProps = {
  ...elFormProps,
  width: {
    type: [String, Number] as PropType<FormItemWidth>,
  },
  grid: {
    type: Boolean,
    default: false,
  },
  rowProps: {
    type: Object as PropType<RowProps>,
  },
  colProps: {
    type: Object as PropType<ColProps>,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  submit: {
    type: Function as PropType<() => any | Promise<any>>,
  },
  reset: {
    type: Function as PropType<() => any>,
  },
  submitText: {
    type: String,
    default: '提交',
  },
  resetText: {
    type: String,
    default: '重置',
  },
  submitProps: {
    type: Object as PropType<ButtonProps>,
  },
  resetProps: {
    type: Object as PropType<ButtonProps>,
  },
  hideSubmit: {
    type: Boolean,
  },
  hideReset: {
    type: Boolean,
  },
};

export type FormProps = Partial<ExtractPropTypes<typeof formProps>>;

export const formPropsOmit = ['grid', 'rowProps', 'colProps', 'width'] as const;

export interface FormSlots {
  default?: (props: Record<string, never>) => any;
  button?: (props: {
    submitting: boolean;
    submit: () => any | Promise<any>;
    reset: () => any;
  }) => any;
}

export interface FormEmits extends /* @vue-ignore */ EmitFn<ElFormEmits> {}

export interface FormExpose {
  submit: () => Promise<any>;
  validate: (callback?: FormValidateCallback) => FormValidationResult;
  validateField: (
    props?: Arrayable<FormItemProp>,
    callback?: FormValidateCallback,
  ) => FormValidationResult;
  resetFields: (props?: Arrayable<FormItemProp>) => void;
  clearValidate: (props?: Arrayable<FormItemProp>) => void;
  scrollToField: (prop: FormItemProp) => void;
  fields: FormItemContext[];
}

const elFormExposeKeys = [
  'validate',
  'validateField',
  'resetFields',
  'scrollToField',
  'clearValidate',
  'fields',
];

export const formExposeKeys = [...elFormExposeKeys, 'submit', 'reset'];

export interface FormContext {
  colProps?: ColProps;
  grid?: boolean;
  readonly?: boolean;
  width?: FormItemWidth;
  addResetField: (reset: () => void) => void;
  removeResetField: (reset: () => void) => void;
}

export const formContextSymbol = Symbol('form');

export interface FormBubbleData {
  readonly: boolean;
  submitting: boolean;
  submit: (throwError?: boolean, shouldReset?: boolean) => any | Promise<any>;
  reset: () => any;
  resetFields: () => any;
  clearValidate: () => any;
}

export interface FormBubbleContext {
  setFormBubbleData: (data: FormBubbleData) => void;
}

export const formBubbleContextSymbol = Symbol('formBubble');
