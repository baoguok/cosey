import { Component, type Plugin } from 'vue';
import { withInstall } from '../utils';
import StackDialog from './stack-dialog.vue';
import { type StackDialogProps } from './stack-dialog';

export * from './stack-dialog';

const _StackDialog: Component<StackDialogProps> & Plugin = withInstall(StackDialog);

export { _StackDialog as StackDialog };
export default _StackDialog;
