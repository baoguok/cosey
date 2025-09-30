import { withInstall } from '../utils';
import TransitionGroup from './transition-group';

export * from './transition-group.api';

const _TransitionGroup = withInstall(TransitionGroup);

export { _TransitionGroup as TransitionGroup };
export default _TransitionGroup;
