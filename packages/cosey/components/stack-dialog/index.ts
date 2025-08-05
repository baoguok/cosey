import { withInstall } from '../utils';
import StackDialog from './stack-dialog.vue';

export * from './stack-dialog';

const _StackDialog = withInstall(StackDialog);

export { _StackDialog as StackDialog };
export default _StackDialog;
