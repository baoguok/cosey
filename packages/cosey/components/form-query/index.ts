import { withInstall } from '../utils';
import FormQuery from './form-query';

export * from './form-query.api';

const _FormQuery = withInstall(FormQuery);

export { _FormQuery as FormQuery };
export default _FormQuery;
