import { withInstall } from '../utils';
import ContextMenu from './context-menu';
import ContextMenuItem from './context-menu-item';
import ContextSubMenu from './context-sub-menu';

export * from './context-menu.api';
export * from './context-menu-item.api';
export * from './context-sub-menu.api';

const _ContextMenuItem = withInstall(ContextMenuItem);
const _ContextSubMenu = withInstall(ContextSubMenu);
const _ContextMenu = withInstall(ContextMenu);

export {
  _ContextMenuItem as ContextMenuItem,
  _ContextSubMenu as ContextSubMenu,
  _ContextMenu as ContextMenu,
};
export default _ContextMenu;
