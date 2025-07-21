import { type DialogEmits, type DialogInstance, type ButtonProps, dialogProps } from 'element-plus';
import { type PropType, type EmitFn, type ExtractPropTypes } from 'vue';

export const formDialogButtonProps = {
  confirmText: {
    type: String,
    default: 'co.common.confirm',
  },
  cancelText: {
    type: String,
    default: 'co.common.cancel',
  },
  confirmProps: {
    type: Object as PropType<ButtonProps>,
  },
  cancelProps: {
    type: Object as PropType<ButtonProps>,
  },
  hideConfirm: {
    type: Boolean,
  },
  hideCancel: {
    type: Boolean,
  },
};

export type FormDialogPresetWidth = 'sm' | 'md' | 'lg' | 'xl';

export const mapFormDialogWidth = {
  sm: 420,
  md: 640,
  lg: 900,
  xl: 1200,
};

export type FormDialogButtonProps = ExtractPropTypes<typeof formDialogButtonProps>;

export type FormDialogWidth = FormDialogPresetWidth | number | (string & {});

export const formDialogProps = {
  ...dialogProps,
  ...formDialogButtonProps,
  width: {
    type: [String, Number] as PropType<FormDialogWidth>,
    default: 'fit-content',
  },
};

export type FormDialogProps = ExtractPropTypes<typeof formDialogProps>;

export interface FormDialogSlots {
  default?: (props: Record<string, never>) => any;
  header?: (props: { close?: () => void; titleId?: string; titleClass?: string }) => any;
  footer?: (props: Record<string, never>) => any;
  button?: (props: {
    submitting: boolean;
    confirm: () => any | Promise<any>;
    cancel: () => any;
  }) => any;
}

export interface FormDialogEmits extends /* @vue-ignore */ EmitFn<DialogEmits> {}

export interface FormDialogExpose extends DialogInstance {}

export const elFormDialogExposeKeys = ['resetPosition', 'handleClose'];
