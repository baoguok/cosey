import { withInstall } from '../utils';
import Mask from './mask.vue';

export * from './mask';

const _Mask = withInstall(Mask);

export { _Mask as Mask };
export default _Mask;
