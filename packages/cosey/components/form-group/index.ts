import { withInstall } from '../utils';
import FormGroup from './form-group';

export * from './form-group.api';

const _FormGroup = withInstall(FormGroup);

export { _FormGroup as FormGroup };
export default _FormGroup;
