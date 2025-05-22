import { type UploadContext } from '../upload';

export interface EditorProps {
  modelValue?: string;
  placeholder?: string;
  height?: string;
  readonly?: boolean;
  validateEvent?: boolean;
  request?: UploadContext['request'];
}

export const defaultEditorProps = {
  validateEvent: true,
};

export interface EditorEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
}
