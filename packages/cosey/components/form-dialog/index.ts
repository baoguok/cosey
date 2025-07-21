import { Component } from 'vue';
import { withInstall } from '../utils';
import FormDialog from './form-dialog.vue';
import { useFormDialogWidth } from './useFormDialogWidth';
import { FormDialogProps } from './form-dialog';
import { type Plugin } from 'vue';

export * from './form-dialog';

const _FormDialog: Component<FormDialogProps> & Plugin = withInstall(FormDialog);

export { _FormDialog as FormDialog, useFormDialogWidth };
export default _FormDialog;
