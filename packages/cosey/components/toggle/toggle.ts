export interface ToggleProps {
  modelValue?: boolean;
}

export interface ToggleSlots {
  default?: (props: Record<string, any>) => any;
}

export interface ToggleEmits {
  (e: 'update:modelValue', value: boolean): void;
}
