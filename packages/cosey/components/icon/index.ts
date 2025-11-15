import { withInstall } from '../utils';
import Icon from './icon';

export * from './icon.api';

const _Icon = withInstall(Icon);

export { _Icon as Icon };
export default _Icon;
