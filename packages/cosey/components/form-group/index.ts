import { withInstall } from '../utils';
import FormGroup from './form-group.vue';

export * from './form-group';

const _FormGroup = withInstall(FormGroup);

export { _FormGroup as FormGroup };
export default _FormGroup;
