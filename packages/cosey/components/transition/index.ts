import { withInstall } from '../utils';
import Transition from './transition';

export * from './transition.api';

const _Transition = withInstall(Transition);

export { _Transition as Transition };
export default _Transition;
