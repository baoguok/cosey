import { type DialogInstance, type ButtonProps, dialogProps, dialogEmits } from 'element-plus';
import type { PropType, ExtractPropTypes, SlotsType } from 'vue';

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
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: false,
  },
};

export type FormDialogProps = ExtractPropTypes<typeof formDialogProps>;

export interface ElDialogSlots {
  default: {};
  header: { close?: () => void; titleId?: string; titleClass?: string };
  footer: {};
}

export interface FormDialogSlots extends ElDialogSlots {
  button: {
    submitting: boolean;
    confirm: () => any | Promise<any>;
    cancel: () => any;
  };
}

export const formDialogSlots = {} as SlotsType<FormDialogSlots>;

export const formDialogEmits = {
  ...dialogEmits,
};

export type FormDialogEmits = typeof formDialogEmits;

export interface FormDialogExpose extends DialogInstance {}

export const elFormDialogExposeKeys = ['resetPosition', 'handleClose'];
