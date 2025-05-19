import { withInstall } from '../utils';
import Container from './container.vue';

export * from './container';

const _Container = withInstall(Container);

export { _Container as Container };
export default _Container;
