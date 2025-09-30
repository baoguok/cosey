import { type FieldComponentCommonProps } from '../common';
import {
  type InputNumberRangeSlots,
  type InputNumberRangeEmits,
  type InputNumberRangeExpose,
  type InputNumberRangeProps,
} from '../../../input-number-range';

export interface FieldNumberRangeProps extends FieldComponentCommonProps {
  componentProps?: Partial<InputNumberRangeProps> & {
    'onUpdate:modelValue'?: (value: number | undefined) => void;
    onChange?: (currentValue: number | undefined, oldValue: number | undefined) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldNumberRangeSlots>;
}

export interface FieldNumberRangeSlots extends InputNumberRangeSlots {}

export interface FieldNumberRangeEmits extends InputNumberRangeEmits {}

export interface FieldNumberRangeExpose extends InputNumberRangeExpose {}
