import type { ExtractPropTypes, PropType } from 'vue';
import { isUndefined } from '../../utils';

export const inputNumberRangeProps = {
  modelValue: {
    type: Array as PropType<number[]>,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  step: {
    type: Number,
  },
  stepStrictly: {
    type: Boolean,
  },
  precision: {
    type: Number,
  },
  startPlaceholder: {
    type: String,
  },
  endPlaceholder: {
    type: String,
  },
  readonly: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
};

export type InputNumberRangeProps = ExtractPropTypes<typeof inputNumberRangeProps>;

export const inputNumberRangeEmits = {
  'update:modelValue': (value: number[] | undefined) => Array.isArray(value) || isUndefined(value),
  change: (value: number[] | undefined) => Array.isArray(value) || isUndefined(value),
};

export type InputNumberRangeEmits = typeof inputNumberRangeEmits;
