import { withInstall } from '../utils';
import IconifyIcon from './iconify-icon.vue';

export * from './iconify-icon';

const _IconifyIcon = withInstall(IconifyIcon);

export { _IconifyIcon as IconifyIcon };
export default _IconifyIcon;
