import { type RouteMeta, type RouteRecordRaw } from 'vue-router';
import { isString } from '../../utils';

export interface MenuItem {
  name: string;
  path?: string;
  title?: string;
  icon?: string;
  children?: MenuItem[];
  // 用于解决ts错误提示：
  // The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
  route: {
    name: string;
    path: string;
    meta: RouteMeta;
    children?: any[];
  };
  _externalLink?: boolean;
  type?: 'group';
  order: number;
}

export interface MenuNode extends MenuItem {
  parent?: MenuItem;
}

/**
 * 根据路由信息生成菜单
 */
export function getMenus(routes: RouteRecordRaw[]): MenuItem[] {
  function recur(routes: RouteRecordRaw[]): MenuItem[] {
    const result: MenuItem[] = [];

    routes.forEach((route) => {
      const {
        name,
        children,
        meta: {
          hideInMenu = false,
          hideChildrenInMenu = false,
          flatChildrenInMenu = false,
          title,
          type,
          order = 0,
          icon,
        } = {},
      } = route;

      if (hideInMenu) {
        return;
      }

      if (flatChildrenInMenu) {
        if (children) {
          result.push(...recur(children));
        }
        return;
      }

      result.push({
        name: isString(name) ? name : String(name),
        path: route.path,
        title,
        icon,
        route: {
          name: route.name as string,
          path: route.path,
          meta: route.meta || {},
          children: route.children,
        },
        type,
        order,
        _externalLink: isString(route.path) && /^https?:\/\//.test(route.path),
        children: children && !hideChildrenInMenu ? recur(children) : undefined,
      });
    });

    result.sort((a, b) => {
      return a.order - b.order;
    });
    return result;
  }

  return recur(routes);
}

/**
 * 获取菜单映射数据，用于根据菜单项名称快速获取菜单项
 */
export function getMenusMap(menus: MenuItem[]) {
  const map: Record<string | number, MenuNode> = {};

  function recur(items: MenuItem[], parent?: MenuNode) {
    items.forEach((item) => {
      const node: MenuNode = { ...item, parent };
      map[item.name] = node;
      if (item.children) {
        recur(item.children, node);
      }
    });
  }

  recur(menus);

  return map;
}

/**
 * 根据当前路由获取路径导航的 keys
 */
export function getMenuPathKeys(node: MenuNode) {
  const keys: (string | number)[] = [];

  let current: MenuNode | undefined = node;
  do {
    if (current.children && current.children.length > 0) {
      keys.push(current.name);
    }
  } while ((current = current.parent));

  return keys;
}

/**
 * 根据当前路由获取路径导航
 */
export function getBreadcrumbRoutes(node: MenuNode) {
  const routes: MenuNode[] = [];

  let current: MenuNode | undefined = node;
  do {
    routes.unshift(current);
  } while ((current = current.parent));

  return routes;
}
