import { withInstall } from '../utils';
import ContextMenu from './context-menu.vue';
import ContextMenuItem from './context-menu-item.vue';
import ContextSubMenu from './context-sub-menu.vue';

export * from './context-menu';
export * from './context-menu-item';
export * from './context-sub-menu';

const _ContextMenuItem = withInstall(ContextMenuItem);
const _ContextSubMenu = withInstall(ContextSubMenu);
const _ContextMenu = withInstall(ContextMenu);

export {
  _ContextMenuItem as ContextMenuItem,
  _ContextSubMenu as ContextSubMenu,
  _ContextMenu as ContextMenu,
};
export default _ContextMenu;
