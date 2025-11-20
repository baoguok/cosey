import { type App } from 'vue';

import { launchRouter } from './router';
import { type CoseyOptions, launchGlobalConfig } from './config';
import { launchGlobalComponents } from './layout';
import { launchStore } from './store';
import { isClient } from './utils';

export { Http, createHttp, http } from './request';

export * from './layout/layout';
export * from './layout/merged';
export { defineRoute, defineRoutes, mergeRouteModules, router } from './router';
export {
  type UserInfo,
  pinia,
  useUserStore,
  useOuterUserStore,
  useLayoutStore,
  useOuterLayoutStore,
} from './store';
export { type CoseyOptions, type LayoutComponents, type LayoutSlots } from './config';
export { persist } from './persist';
export { i18n } from './locale';

export * from './config/root-config-provider.api';
export { default as RootConfigProvider } from './config/root-config-provider';

export function launch(app: App, options: CoseyOptions = {}) {
  // 路由
  launchRouter(app, options.router);

  // 全局状态管理
  launchStore(app);

  // 全局组件
  launchGlobalComponents(app);

  // 全局配置，仅非ssr
  if (isClient()) {
    launchGlobalConfig(app, options);
  }
}
