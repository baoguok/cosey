import { withInstall } from '../utils';
import Copy from './copy.vue';

export * from './copy';

const _Copy = withInstall(Copy);

export { _Copy as Copy };
export default _Copy;
