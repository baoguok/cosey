import { withInstall } from '../utils';
import Copy from './copy';

export * from './copy.api';

const _Copy = withInstall(Copy);

export { _Copy as Copy };
export default _Copy;
