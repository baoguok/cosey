import { ExtractPropTypes, SlotsType } from 'vue';
import { isBoolean } from '../../utils';

export const toggleProps = {
  modelValue: {
    type: Boolean,
  },
};

export type ToggleProps = ExtractPropTypes<typeof toggleProps>;

export interface ToggleSlots {
  default: {};
}

export const toggleSlots = Object as SlotsType<ToggleSlots>;

export const toggleEmits = {
  'update:modelValue': (value: boolean) => isBoolean(value),
};

export type ToggleEmits = typeof toggleEmits;
