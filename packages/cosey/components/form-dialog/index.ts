import { type Plugin, Component } from 'vue';
import { withInstall } from '../utils';
import FormDialog from './form-dialog';
import { useFormDialogWidth } from './useFormDialogWidth';
import { FormDialogProps } from './form-dialog.api';

export * from './form-dialog.api';

const _FormDialog: Component<FormDialogProps> & Plugin = withInstall(FormDialog);

export { _FormDialog as FormDialog, useFormDialogWidth };
export default _FormDialog;
