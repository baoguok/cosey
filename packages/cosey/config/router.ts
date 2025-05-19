import type { DeepPartial } from '../types/helper';

/**
 * 路由配置
 */
export const defaultRouterConfig = {
  /**
   * 主页路由的路径
   */
  homePath: '/dashboard/workspace',

  /**
   * 登录页路由的路径
   */
  loginPath: '/auth/login',

  /**
   * 修改密码路由的路径
   */
  changePasswordPath: '/auth/change-password',
};

export type RouterConfig = DeepPartial<typeof defaultRouterConfig>;
export type RequiredRouterConfig = typeof defaultRouterConfig;
