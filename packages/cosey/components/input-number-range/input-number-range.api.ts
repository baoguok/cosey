import type { ExtractPropTypes, PropType } from 'vue';
import { isUndefined } from '../../utils';

export const inputNumberRangeProps = {
  modelValue: {
    type: Array as PropType<number[]>,
  },
  min: {
    type: Number as PropType<number>,
  },
  max: {
    type: Number as PropType<number>,
  },
  step: {
    type: Number as PropType<number>,
  },
  stepStrictly: {
    type: Boolean as PropType<boolean>,
  },
  precision: {
    type: Number as PropType<number>,
  },
  startPlaceholder: {
    type: String as PropType<string>,
  },
  endPlaceholder: {
    type: String as PropType<string>,
  },
  readonly: {
    type: Boolean as PropType<boolean>,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
  },
  validateEvent: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
};

export type InputNumberRangeProps = ExtractPropTypes<typeof inputNumberRangeProps>;

export const inputNumberRangeEmits = {
  'update:modelValue': (value: number[] | undefined) => Array.isArray(value) || isUndefined(value),
  change: (value: number[] | undefined) => Array.isArray(value) || isUndefined(value),
};

export type InputNumberRangeEmits = typeof inputNumberRangeEmits;
