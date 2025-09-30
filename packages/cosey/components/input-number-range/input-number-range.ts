export interface InputNumberRangeProps {
  modelValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  stepStrictly?: boolean;
  precision?: number;
  startPlaceholder?: string;
  endPlaceholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  validateEvent?: boolean;
}

export const defaultInputNumberRangeProps = {
  validateEvent: true,
};

export interface InputNumberRangeSlots {
  default?: (props: Record<string, never>) => any;
}

export interface InputNumberRangeEmits {
  (e: 'update:modelValue', value: number[] | undefined): void;
  (e: 'change', value: number[] | undefined): void;
}

export interface InputNumberRangeExpose {}
