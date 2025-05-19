import { drawerEmits, drawerProps } from 'element-plus';
import { type ExtractPropTypes, PropType, type EmitFn } from 'vue';
import { formDialogButtonProps, type FormDialogWidth, type FormDialogSlots } from '../form-dialog';

export const formDrawerProps = {
  ...drawerProps,
  ...formDialogButtonProps,
  size: {
    type: [String, Number] as PropType<FormDialogWidth>,
    default: 'fit-content',
  },
};

export type FormDrawerProps = ExtractPropTypes<typeof formDrawerProps>;

export interface FormDrawerSlots extends FormDialogSlots {}

export interface FormDrawerEmits extends /* @vue-ignore */ EmitFn<typeof drawerEmits> {}

export interface ElDrawerExpose {
  handleClose: () => void;
}

export interface FormDrawerExpose extends ElDrawerExpose {}

export const elFormDrawerExposeKeys = ['handleClose'];
