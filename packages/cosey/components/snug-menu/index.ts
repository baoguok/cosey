import { withInstall } from '../utils';
import SnugMenu from './snug-menu.vue';
import SnugMenuItem from './snug-menu-item.vue';

export * from './snug-menu';
export * from './snug-menu-item';

const _SnugMenu = withInstall(SnugMenu);
const _SnugMenuItem = withInstall(SnugMenuItem);

export { _SnugMenu as SnugMenu, _SnugMenuItem as SnugMenuItem };
export default _SnugMenu;
