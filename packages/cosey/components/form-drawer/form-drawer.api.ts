import { drawerEmits, drawerProps } from 'element-plus';
import { type ExtractPropTypes, PropType, SlotsType } from 'vue';
import { formDialogButtonProps, type FormDialogWidth, type FormDialogSlots } from '../form-dialog';

export const formDrawerProps = {
  ...drawerProps,
  ...formDialogButtonProps,
  size: {
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

export type FormDrawerProps = ExtractPropTypes<typeof formDrawerProps>;

export interface FormDrawerSlots extends FormDialogSlots {}

export const formDrawerSlots = {} as SlotsType<FormDialogSlots>;

export const formDrawerEmits = {
  ...drawerEmits,
};

export type FormDrawerEmits = typeof formDrawerEmits;

export interface ElDrawerExpose {
  handleClose: () => void;
}

export interface FormDrawerExpose extends ElDrawerExpose {}

export const elFormDrawerExposeKeys = ['handleClose'];
