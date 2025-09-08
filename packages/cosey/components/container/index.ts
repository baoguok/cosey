import { withInstall } from '../utils';
import Container from './container';

export * from './container.api';

const _Container = withInstall(Container);

export { _Container as Container };
export default _Container;
