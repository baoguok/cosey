import { uuid } from '../utils';
import { type RouteRecordRaw } from 'vue-router';

/**
 * 定义单个路由节点
 */
export function defineRoute(route: RouteRecordRaw) {
  function recur(route: RouteRecordRaw): RouteRecordRaw {
    const meta = route.meta || {};
    return {
      ...route,
      name: route.name || uuid(),
      children: Array.isArray(route.children) ? route.children.map(recur) : undefined,
      meta: {
        ...meta,
        closable: meta.closable ?? true,
        keepAlive: meta.keepAlive ?? true,
        authentication: meta.authentication ?? true,
      },
    } as RouteRecordRaw;
  }

  return recur(route);
}

/**
 * 定义路由模块，可接收数组或对象，返回路由节点列表
 */
export function defineRoutes(route: RouteRecordRaw | RouteRecordRaw[]) {
  return (Array.isArray(route) ? route : [route]).map(defineRoute);
}

/**
 * 合并多个模块的路由
 */
export const mergeRouteModules = (modules: Record<string, unknown>) => {
  return Object.keys(modules).reduce((result, key) => {
    const module = (modules[key] as Record<string, unknown>).default as RouteRecordRaw[];
    return result.concat(module);
  }, [] as RouteRecordRaw[]);
};
