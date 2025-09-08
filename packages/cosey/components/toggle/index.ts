import { withInstall } from '../utils';
import Toggle from './toggle';

export * from './toggle.api';

const _Toggle = withInstall(Toggle);

export { _Toggle as Toggle };
export default _Toggle;
