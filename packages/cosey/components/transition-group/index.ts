import { withInstall } from '../utils';
import TransitionGroup from './transition-group.vue';

export * from './transition-group';

const _TransitionGroup = withInstall(TransitionGroup);

export { _TransitionGroup as TransitionGroup };
export default _TransitionGroup;
