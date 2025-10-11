import { withInstall } from '../utils';
import StackDialog from './stack-dialog';

export * from './stack-dialog.api';

const _StackDialog = withInstall(StackDialog);

export { _StackDialog as StackDialog };
export default _StackDialog;
