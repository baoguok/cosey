import { withInstall } from '../utils';
import Icon from './icon.vue';

export * from './icon';

const _Icon = withInstall(Icon);

export { _Icon as Icon };
export default _Icon;
