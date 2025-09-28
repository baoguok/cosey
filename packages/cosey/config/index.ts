import { defaultRouterConfig, type RequiredRouterConfig, type RouterConfig } from './router';
import { defaultPersistConfig, type PersistConfig } from './persist';
import { defaultLayoutConfig, type LayoutConfig, type RequiredLayoutConfig } from './layout';
import { defaultSiteConfig, type SiteConfig, type RequiredSiteConfig } from './site';

import { type RequiredHttpConfig, type HttpConfig, defaultHttpConfig } from './http';

import { type RequiredApiConfig, type ApiConfig, defaultApiConfig } from './api';

import { defaultsDeep } from 'lodash-es';
import { type App, type Component, type InjectionKey, type VNodeChild, inject } from 'vue';

import { type CoseyRouterOptions } from '../router';
import { type RouteRecordRaw } from 'vue-router';
import { createPersist, persistContextKey } from '../hooks';

export interface LayoutComponents {
  base?: string | Component;
  sidebar?: string | Component;
  snugAside?: string | Component;
  snugMenu?: string | Component;
  aside?: string | Component;
  menu?: string | Component;
  mask?: string | Component;
  content?: string | Component;
  header?: string | Component;
  topbar?: string | Component;
  brand?: string | Component;
  toggle?: string | Component;
  topSnugMenu?: string | Component;
  breadcrumb?: string | Component;
  search?: string | Component;
  colorScheme?: string | Component;
  user?: string | Component;
  tabbar?: string | Component;
  main?: string | Component;
  iframe?: string | Component;
  switchEffect?: string | Component;
  auth?: string | Component;
  login?: string | Component;
  changePassword?: string | Component;
  exception?: string | Component;
  forbidden?: string | Component;
  notFound?: string | Component;
  internalServerError?: string | Component;
  empty?: string | Component;
  locale?: string | Component;
}

export interface LayoutSlots {
  topbarRight?: () => VNodeChild;
  topbarWidget?: () => VNodeChild;
  authWidget?: () => VNodeChild;
  userMenu?: () => VNodeChild;
  afterToggle?: () => VNodeChild;
}

type FilterRouteHandler = (
  route: RouteRecordRaw,
) => RouteRecordRaw | void | boolean | undefined | null;

export type CoseyOptions = {
  router?: CoseyRouterOptions & RouterConfig;
  persist?: PersistConfig;
  http?: HttpConfig;
  layout?: LayoutConfig;
  site?: SiteConfig;
  api?: ApiConfig;
  filterRoute?: { hook: () => FilterRouteHandler } | FilterRouteHandler;
  defineAuthority?: (userInfo: Record<any, any>) => void | Promise<void>;
  components?: LayoutComponents;
  slots?: LayoutSlots;
};

export interface GlobalConfig {
  router: RequiredRouterConfig;
  http: RequiredHttpConfig;
  layout: RequiredLayoutConfig;
  site: RequiredSiteConfig;
  api: RequiredApiConfig;
  filterRoute: NonNullable<CoseyOptions['filterRoute']>;
  defineAuthority?: CoseyOptions['defineAuthority'];
  components: NonNullable<CoseyOptions['components']>;
  slots: NonNullable<CoseyOptions['slots']>;
}

const globalConfigContextKey = Symbol('globalConfigContext') as InjectionKey<GlobalConfig>;

export function provideGlobalConfig(app: App, options: CoseyOptions) {
  const {
    router: { homePath, loginPath, changePasswordPath } = {},
    persist = {},
    http = {},
    layout = {},
    site = {},
    api = {},
    filterRoute = () => true,
    defineAuthority,
    components = {},
    slots = {},
  } = options;

  const persistConfig = defaultsDeep(persist, defaultPersistConfig);

  app.provide(persistContextKey, createPersist(persistConfig.name, persistConfig.type));

  app.provide(globalConfigContextKey, {
    router: defaultsDeep({ homePath, loginPath, changePasswordPath }, defaultRouterConfig),
    http: defaultsDeep(http, defaultHttpConfig),
    layout: defaultsDeep(layout, defaultLayoutConfig),
    site: defaultsDeep(site, defaultSiteConfig),
    api: defaultsDeep(api, defaultApiConfig),
    filterRoute,
    defineAuthority,
    components,
    slots,
  });
}

export function useGlobalConfig() {
  return inject(globalConfigContextKey, {} as GlobalConfig);
}
