import type { ExtractPropTypes, SlotsType } from 'vue';
import { isString } from '../../utils';

export const editorProps = {
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  height: {
    type: String,
  },
  maxHeight: {
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

export type EditorProps = ExtractPropTypes<typeof editorProps>;

export interface EditorSlots {
  default: {};
}

export const editorSlots = Object as SlotsType<EditorSlots>;

export const editorEmits = {
  change: (value: string) => isString(value),
  'update:modelValue': (value: string) => isString(value),
};

export type EditorEmits = typeof editorEmits;

export interface EditorExpose {}
