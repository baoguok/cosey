import { withInstall } from '../utils';
import FormList from './form-list.vue';

export * from './form-list.api';

const _FormList = withInstall(FormList);

export { _FormList as FormList };
export default _FormList;
