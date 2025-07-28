export interface InputNumberRangeProps {
  modelValue?: number[];
  startPlaceholder?: string;
  endPlaceholder?: string;
}

export interface InputNumberRangeSlots {
  default?: (props: Record<string, never>) => any;
}

export interface InputNumberRangeEmits {
  (e: 'update:modelValue', value: number[] | undefined): void;
  (e: 'change', value: number[] | undefined): void;
}

export interface InputNumberRangeExpose {}
