import { type MediaCardBaseProps } from '../media-card';
import { type UploadContext } from '../upload-context';

export type UploadFileStatus = 'unready' | 'ready' | 'loading' | 'success' | 'error';

export interface UploadFile {
  status: UploadFileStatus;
  name: string;
  size: number;
  type: string;
  raw: File | null;
  url: string | File;
  previewUrl: string;
  key: string;
  percent: number;
  controller: AbortController | null;
}

export interface UploadProps {
  accept?: string;
  limit?: number;
  multiple?: boolean;
  modelValue?: string | File | (string | File)[];
  validateEvent?: boolean;
  single?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  selectOnly?: boolean;
  size?: MediaCardBaseProps['size'];
  request?: UploadContext['request'];
}

export const defaultUploadProps = {
  accept: '',
  limit: 0,
  validateEvent: true,
  size: 'large' as const,
};

export interface UploadSlots {
  default?: (props: Record<string, never>) => any;
}

export interface UploadEmits {
  (e: 'exceed'): void;
  (e: 'update:modelValue', value: string | File | (string | File)[]): void;
  (e: 'change', value: string | File | (string | File)[]): void;
}

export interface UploadItemProps {
  file: UploadFile;
  readonly?: boolean;
  size?: MediaCardBaseProps['size'];
}

export interface UploadItemEmits {
  (e: 'cancel'): void;
  (e: 're-upload'): void;
  (e: 'remove'): void;
}
