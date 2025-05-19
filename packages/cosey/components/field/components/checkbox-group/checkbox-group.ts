import {
  type CheckboxGroupValueType,
  type CheckboxGroupInstance,
  type CheckboxGroupProps,
  type CheckboxValueType,
  type CheckboxProps,
} from 'element-plus';
import { type FieldComponentCommonProps } from '../common';

export type FieldCheckboxGroupOption = Partial<CheckboxProps> | string | number;

export interface FieldCheckboxGroupProps extends FieldComponentCommonProps {
  componentProps?: Partial<CheckboxGroupProps> & {
    'onUpdate:modelValue'?: (val: CheckboxGroupValueType) => void;
    onChange?: (val: CheckboxValueType[]) => void;
    [key: PropertyKey]: any;
  } & {
    options?: FieldCheckboxGroupOption[];
    labelKey?: string;
    valueKey?: string;
    type?: 'button' | 'checkbox';
    checkboxWidth?: string | number;
    indeterminate?: boolean;
    maxHeight?: string | number;
  };
  componentSlots?: Partial<FieldCheckboxGroupSlots>;
}

export interface FieldCheckboxGroupSlots {
  default?: (props: Record<string, any>) => any;
}

export interface FieldCheckboxGroupEmits {
  (e: 'update:modelValue', val: CheckboxGroupValueType): void;
  (e: 'change', val: CheckboxValueType[]): void;
}

export type FieldCheckboxGroupExpose = CheckboxGroupInstance;
