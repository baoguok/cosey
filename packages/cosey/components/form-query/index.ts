import { withInstall } from '../utils';
import FormQuery from './form-query.vue';

export * from './form-query';

const _FormQuery = withInstall(FormQuery);

export { _FormQuery as FormQuery };
export default _FormQuery;
