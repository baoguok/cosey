import { ExtractPropTypes, PropType } from 'vue';
import { type UploadContext } from '../upload';
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
  readonly: {
    type: Boolean,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  request: {
    type: Function as PropType<UploadContext['request']>,
  },
};

export type EditorProps = ExtractPropTypes<typeof editorProps>;

export const editorEmits = {
  'update:modelValue': (value: string) => isString(value),
  change: (value: string) => isString(value),
};

export type EditorEmits = typeof editorEmits;
