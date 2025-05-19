import { defaultRouterConfig, type RequiredRouterConfig, type RouterConfig } from './router';
import { defaultPersistConfig, type PersistConfig } from './persist';
import { defaultLayoutConfig, type LayoutConfig, type RequiredLayoutConfig } from './layout';
import { defaultSiteConfig, type SiteConfig, type RequiredSiteConfig } from './site';

import { type RequiredHttpConfig, type HttpConfig, defaultHttpConfig } from './http';

import { type RequiredApiConfig, type ApiConfig, defaultApiConfig } from './api';

import { defaultsDeep } from 'lodash-es';
import Persist from '@gunny/persist';
import { type App, type Component, type InjectionKey, type VNodeChild, inject } from 'vue';

import { type CoseyRouterOptions } from '../router';
import { type RouteRecordRaw } from 'vue-router';
import { createPersist } from '../hooks';

export interface LayoutComponents {
  aside?: string | Component;
  auth?: string | Component;
  base?: string | Component;
  brand?: string | Component;
  breadcrumb?: string | Component;
  changePassword?: string | Component;
  colorScheme?: string | Component;
  content?: string | Component;
  empty?: string | Component;
  exception?: string | Component;
  forbidden?: string | Component;
  header?: string | Component;
  iframe?: string | Component;
  internalServerError?: string | Component;
  login?: string | Component;
  main?: string | Component;
  mask?: string | Component;
  menu?: string | Component;
  notFound?: string | Component;
  search?: string | Component;
  sidebar?: string | Component;
  snugAside?: string | Component;
  snugMenu?: string | Component;
  switchEffect?: string | Component;
  tabbar?: string | Component;
  toggle?: string | Component;
  topSnugMenu?: string | Component;
  topbar?: string | Component;
  user?: string | Component;
}

export interface LayoutSlots {
  topbarRight?: () => VNodeChild;
  authWidget?: () => VNodeChild;
  userMenu?: () => VNodeChild;
}

export type CoseyOptions = {
  router?: CoseyRouterOptions & RouterConfig;
  persist?: PersistConfig;
  http?: HttpConfig;
  layout?: LayoutConfig;
  site?: SiteConfig;
  api?: ApiConfig;
  filterRoute?: (route: RouteRecordRaw) => RouteRecordRaw | void | boolean | undefined;
  defineAuthority?: (userInfo: Record<any, any>) => void | Promise<void>;
  components?: LayoutComponents;
  slots?: LayoutSlots;
};

export interface GlobalConfig {
  persist?: Persist;
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

  app.provide(globalConfigContextKey, {
    persist: createPersist(persistConfig.name, persistConfig.type),
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
