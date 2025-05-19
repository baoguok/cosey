import type { DeepPartial } from '../types/helper';

/**
 * 网站相关配置
 */
export const defaultSiteConfig = {
  /**
   * 网站名称，展示在顶部导航、登录页等位置
   */
  name: '',

  /**
   * 网站logo，展示在浏览器标签页、顶部导航、登录页等位置
   */
  logo: '',

  /**
   * 网站描述，用于meta描述、登录页描述等位置
   */
  description: '',
};

export type SiteConfig = DeepPartial<typeof defaultSiteConfig>;
export type RequiredSiteConfig = typeof defaultSiteConfig;
