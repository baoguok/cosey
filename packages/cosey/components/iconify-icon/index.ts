import { withInstall } from '../utils';
import IconifyIcon from './iconify-icon';

export * from './iconify-icon.api';

const _IconifyIcon = withInstall(IconifyIcon);

export { _IconifyIcon as IconifyIcon };
export default _IconifyIcon;
