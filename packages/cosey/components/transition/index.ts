import { withInstall } from '../utils';
import Transition from './transition.vue';

export * from './transition';

const _Transition = withInstall(Transition);

export { _Transition as Transition };
export default _Transition;
