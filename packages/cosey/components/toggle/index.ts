import { withInstall } from '../utils';
import Toggle from './toggle.vue';

export * from './toggle';

const _Toggle = withInstall(Toggle);

export { _Toggle as Toggle };
export default _Toggle;
