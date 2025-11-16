import {
  type ButtonProps,
  formProps as elFormProps,
  FormItemProp,
  FormValidateCallback,
  FormValidationResult,
  FormItemContext,
  formEmits as elFormEmits,
} from 'element-plus';
import { ExtractPropTypes, SlotsType, type PropType } from 'vue';
import { type RowProps } from '../row';
import { type ColPublicProps } from '../col';
import { type FormItemWidth } from './form-item.api';
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
    type: Object as PropType<ColPublicProps>,
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
    default: 'co.form.submit',
  },
  resetText: {
    type: String,
    default: 'co.form.reset',
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
  hideButtons: {
    type: Boolean,
  },
};

export type FormProps = ExtractPropTypes<typeof formProps>;

export const formPropsOmit = [
  'grid',
  'rowProps',
  'colProps',
  'width',
  'readonly',
  'submit',
  'reset',
  'submitText',
  'resetText',
  'submitProps',
  'resetProps',
  'hideSubmit',
  'hideReset',
  'hideButtons',
] as const;

export interface FormSlots {
  default: {};
  button: {
    submitting: boolean;
    submit: () => any | Promise<any>;
    reset: () => any;
  };
}

export const formSlots = Object as SlotsType<FormSlots>;

export const formEmits = {
  ...elFormEmits,
};

export type FormEmits = typeof formEmits;

export interface FormExpose {
  reset: (callback?: () => void) => void;
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
  colProps?: ColPublicProps;
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
