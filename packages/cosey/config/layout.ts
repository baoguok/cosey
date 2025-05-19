import type { DeepPartial } from '../types/helper';

/**
 * 布局相关组件的默认配置
 */
export const defaultLayoutConfig = {
  /**
   * 响应式移动设备断点值
   */
  breakpoint: 768,

  /**
   * 是否启用标签页缓存
   */
  keepAlive: true,

  /**
   * 是否默认显示侧边栏
   */
  sidebarVisible: true,

  /**
   * 是否默认折叠收起垂直菜单
   */
  collapse: false,

  /**
   * 菜单类型
   */
  menuType: 'vertical' as
    | 'vertical'
    | 'biserial'
    | 'horizontal'
    | 'horizontal-vertical'
    | 'horizontal-biserial',

  /**
   * 是否显示标签页
   */
  tabbarVisible: true,

  /**
   * 侧边菜单宽度
   */
  asideWidth: 220,

  /**
   * 折叠时侧边栏菜单宽度
   */
  collapsedAsideWidth: 64,

  /**
   * 紧凑侧边菜单宽度
   */
  snugAsideWidth: 85,

  /**
   * 顶部栏高度
   */
  topbarHeight: 48,

  /**
   * 标签栏高度
   */
  tabbarHeight: 41,
};

export type LayoutConfig = DeepPartial<typeof defaultLayoutConfig>;
export type RequiredLayoutConfig = typeof defaultLayoutConfig;
