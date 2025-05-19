import { type App } from 'vue';

import { createCoseyRouter } from './router';
import { registerRouterGuard } from './router/guard';
import { type CoseyOptions, provideGlobalConfig } from './config';
import { registerGlobalComponents } from './layout';
import { createStore } from './store';

export * from './request';
export * from './layout';
export * from './router';
export { useUserStore, useAppearanceStore, useLayoutStore } from './store';
export * from './config';
export * from './config/root-config-provider';
export { default as RootConfigProvider } from './config/root-config-provider.vue';

export interface CoseyApp<HostElement> extends App<HostElement> {}

export const createCosey = (options: CoseyOptions = {}) => {
  const store = createStore();
  const router = createCoseyRouter(options.router);

  return {
    install(app: App) {
      provideGlobalConfig(app, options);

      // 路由
      app.use(router);

      // 路由守卫
      registerRouterGuard(router);

      // 全局状态管理
      app.use(store);

      // 全局组件
      registerGlobalComponents(app);
    },
    store,
    router,
  };
};
