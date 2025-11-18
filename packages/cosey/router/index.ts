import {
  type RouteRecordRaw,
  type RouterOptions,
  type RouterHistory,
  createWebHashHistory,
  createRouter,
  Router,
} from 'vue-router';

import type { AnyAbility } from '@casl/ability';

import { staticRoutes } from './routes';
import { cloneDeep } from 'lodash-es';
import { App } from 'vue';
import { registerRouterGuard } from './guard';

export {
  type MenuItem,
  type MenuNode,
  getMenus,
  getMenusMap,
  getMenuPathKeys,
  getBreadcrumbRoutes,
} from './menus';

export { defineRoute, defineRoutes, mergeRouteModules } from './utils';

export let router: Router;

export interface CoseyRouterOptions extends Omit<RouterOptions, 'routes' | 'history'> {
  history?: RouterHistory;
  dynamic?: RouteRecordRaw[];
  static?: RouteRecordRaw[];
  listening?: boolean;
}

let customDynamicRoutes: RouteRecordRaw[] = [];
let customStaticRoutes: RouteRecordRaw[] = [];

export const getAllDynamicRoutes = () => {
  return cloneDeep(customDynamicRoutes);
};

export const getAllStaticRoutes = () => {
  return [...staticRoutes, ...customStaticRoutes];
};

export function launchRouter(app: App, options: CoseyRouterOptions = {}) {
  const { static: static$ = [], dynamic = [], listening = true, ...restOptions } = options;

  customStaticRoutes = static$;

  customDynamicRoutes = dynamic;

  const mergedOptions = Object.assign(
    {
      strict: true,
      scrollBehavior: () => ({ left: 0, top: 0 }),
    },
    restOptions,
    {
      routes: getAllStaticRoutes(),
      history: restOptions.history || createWebHashHistory(),
    },
  );

  router = createRouter(mergedOptions);

  router.listening = listening;

  if (listening) {
    registerRouterGuard(router);
  }

  app.use(router);
}

declare module 'vue-router' {
  export interface RouteMeta {
    // 页面、菜单、路径导航的标题
    title?: string;

    // 菜单图标
    icon?: string;

    // 是否在菜单中隐藏，默认值 false
    hideInMenu?: boolean;

    // 是否在菜单中隐藏子级菜单，默认值 false
    hideChildrenInMenu?: boolean;

    // 打平子级菜单，只显示子级菜单，不显示父菜单，默认值 false
    flatChildrenInMenu?: boolean;

    // 菜单类型，默认值 undefined
    type?: 'group';

    // 是否可在标签页中关闭，默认值 true
    closable?: boolean;

    // 是否缓存页面，默认值 true
    keepAlive?: boolean;

    // 菜单排序，升序，默认值 0
    order?: number;

    // 内嵌到当前页面的 iframe 地址
    iframeSrc?: string;

    // 是否需要经过身份验证才能访问，默认值 true
    authentication?: boolean;

    // 权限
    authority?: (ability: AnyAbility) => boolean;
  }
}

/* 内部属性 */
declare module 'vue-router' {
  export interface RouteMeta {
    /* 是否为外部链接，会在新窗口打开 */
    _externalLink?: boolean;
  }
}
