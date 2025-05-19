import { type FieldComponentCommonProps } from '../common';
import { type ExtractPropTypes } from 'vue';
import { SelectProps } from 'element-plus/es/components/select-v2/src/defaults.mjs';

export interface FieldSelectV2Props extends FieldComponentCommonProps {
  componentProps?: Partial<ExtractPropTypes<typeof SelectProps>> & {
    'onUpdate:modelValue'?: (value: any) => void;
    onChange?: (value: any) => void;
    onVisibleChange?: (visible: boolean) => void;
    onRemoveTag?: (tagValue: any) => void;
    onClear?: () => void;
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldSelectV2Slots>;
}

export interface FieldSelectV2Slots {
  default?: (props: Record<string, any>) => any;
  header?: (props: Record<string, any>) => any;
  footer?: (props: Record<string, any>) => any;
  prefix?: (props: Record<string, any>) => any;
  empty?: (props: Record<string, any>) => any;
  tag?: (props: Record<string, any>) => any;
  loading?: (props: Record<string, any>) => any;
  label?: (props: Record<string, any>) => any;
}

export interface FieldSelectV2Emits {
  (e: 'update:modelValue', value: any): void;
  (e: 'change', value: any): void;
  (e: 'visible-change', visible: boolean): void;
  (e: 'remove-tag', tagValue: any): void;
  (e: 'clear'): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}

export type FieldSelectV2Expose = {
  focus: () => void;
  blur: () => void;
};
