import { withInstall } from '../utils';
import FormDialog from './form-dialog.vue';
import { useFormDialogWidth } from './useFormDialogWidth';

export * from './form-dialog';

const _FormDialog = withInstall(FormDialog);

export { _FormDialog as FormDialog, useFormDialogWidth };
export default _FormDialog;
