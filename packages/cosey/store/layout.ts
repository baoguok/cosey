import { defineStore } from 'pinia';
import { useRoute, type RouteLocationNormalized } from 'vue-router';
import { getBreadcrumbRoutes, getMenusMap, type MenuItem } from '../router';
import { useGlobalConfig } from '../config';
import { computed, nextTick, ref, watch } from 'vue';
import { useWindowResize } from '../hooks';

export type LayoutMenuType =
  | 'vertical'
  | 'biserial'
  | 'horizontal'
  | 'horizontal-vertical'
  | 'horizontal-biserial';

export interface LayoutTab {
  name: string;
  meta: RouteLocationNormalized['meta'];
}

export const useLayoutStore = defineStore('cosey-layout', () => {
  const { layout: layoutConfig } = useGlobalConfig();
  const route = useRoute();

  // 是否显示侧边栏
  const sidebarVisible = ref(layoutConfig.sidebarVisible);
  // 是否折叠收起垂直菜单
  const collapse = ref(layoutConfig.collapse);

  /****************************************************************
   * 🧩 响应式
   ****************************************************************/

  // 当前是否为移动设备（根据屏幕大小）
  const isMobile = ref(false);

  // 缩小到移动端自定义隐藏侧边栏
  watch(
    isMobile,
    () => {
      sidebarVisible.value = !isMobile.value;
    },
    {
      immediate: true,
    },
  );

  const onResize = () => {
    isMobile.value = window.innerWidth <= layoutConfig.breakpoint;
  };
  onResize();
  useWindowResize(onResize);

  /************** end **************/

  /****************************************************************
   * 菜单类型与数据
   ****************************************************************/

  // 菜单类型
  const menuType = ref<LayoutMenuType>(layoutConfig.menuType);
  // 是否包含水平菜单
  const includeHorizontal = computed(() =>
    ['horizontal', 'horizontal-vertical', 'horizontal-biserial'].includes(menuType.value),
  );
  const isVertical = computed(() => menuType.value === 'vertical');
  const isBiserial = computed(() => menuType.value === 'biserial');
  const isHorizontal = computed(() => menuType.value === 'horizontal');
  const isHorizontalVertical = computed(() => menuType.value === 'horizontal-vertical');
  const isHorizontalBiserial = computed(() => menuType.value === 'horizontal-biserial');

  // 菜单数据
  const menus = ref<MenuItem[]>([]);

  // 菜单映射数据，用于快速获取菜单项
  const menusMap = computed(() => getMenusMap(menus.value));

  // 一级菜单数据
  const firstLevelMenus = menus;

  // 当前选择的一级菜单
  const firstLevelActive = ref('');

  // 二级菜单数据
  const secondLevelMenus = computed(() => {
    return (
      firstLevelMenus.value.find((item) => {
        return item.name === firstLevelActive.value;
      })?.children || []
    );
  });

  // 当前选择的二级菜单
  const secondLevelActive = ref('');

  // 三级菜单数据
  const thirdLevelMenus = computed(() => {
    return (
      secondLevelMenus.value.find((item) => {
        return item.name === secondLevelActive.value;
      })?.children || []
    );
  });

  // 顶部菜单数据
  const topMenus = firstLevelMenus;

  // 当前顶级菜单
  const topActive = firstLevelActive;

  // snug 菜单数据
  const snugMenus = computed(() => {
    if (isMobile.value) {
      return [];
    }
    return menuType.value === 'biserial'
      ? firstLevelMenus.value
      : menuType.value === 'horizontal-biserial'
        ? secondLevelMenus.value
        : [];
  });

  // 当前选择的 snug 菜单
  const snugActive = computed({
    get() {
      return menuType.value === 'biserial'
        ? firstLevelActive.value
        : menuType.value === 'horizontal-biserial'
          ? secondLevelActive.value
          : '';
    },
    set(name: string) {
      if (menuType.value === 'biserial') {
        firstLevelActive.value = name;
      } else if (menuType.value === 'horizontal-biserial') {
        secondLevelActive.value = name;
      }
    },
  });

  // 默认菜单（水平或垂直）
  const defaultMenus = computed(() => {
    if (isMobile.value) {
      return firstLevelMenus.value;
    }
    return menuType.value === 'biserial' || menuType.value === 'horizontal-vertical'
      ? secondLevelMenus.value
      : menuType.value === 'horizontal-biserial'
        ? thirdLevelMenus.value
        : firstLevelMenus.value;
  });

  // 根据当前路由切换选中的菜单项
  watch([() => route.name, menus], () => {
    const node = menusMap.value[route.name as string];
    if (node) {
      const nodes = getBreadcrumbRoutes(node);

      topActive.value = nodes[0].name;

      if (menuType.value === 'biserial') {
        snugActive.value = nodes[0].name;
      } else if (menuType.value === 'horizontal-biserial') {
        snugActive.value = nodes[1]?.name;
      }
    }
  });

  /************** end **************/

  /****************************************************************
   * 标签页与页面缓存
   ****************************************************************/

  // 是否显示标签页
  const tabbarVisible = ref(layoutConfig.tabbarVisible);
  // 当前活动的标签页
  const activeTab = ref('');
  // 当前标签页是否处理加载状态
  const refreshing = ref(false);
  // 标签页数据
  const tabList = ref<LayoutTab[]>([]);
  // iframe 标签页数据
  const iframeTabList = computed<LayoutTab[]>(() => {
    return tabList.value.filter((item) => item.meta.iframeSrc);
  });
  // 缓存的标签页列表
  const keepAliveInclude = ref<string[]>([]);
  // 忽略缓存的标签页列表
  const keepAliveExclude = computed(() => {
    return layoutConfig.keepAlive
      ? tabList.value.filter((item) => !item.meta.keepAlive).map((item) => item.name)
      : [];
  });
  // 缓存的路由
  const keepAlive = computed(() => {
    return keepAliveInclude.value.filter((name) => {
      return !keepAliveExclude.value.includes(name);
    });
  });
  /**
   * 根据标签页数据更新缓存的标签页数据
   */
  const updateKeepAliveInclude = () => {
    keepAliveInclude.value = layoutConfig.keepAlive ? tabList.value.map((item) => item.name) : [];
  };

  watch(
    tabList,
    () => {
      updateKeepAliveInclude();
    },
    {
      immediate: true,
      deep: true,
    },
  );

  /**
   * 刷新页面
   */
  const reload = () => {
    refreshing.value = true;
    if (keepAliveInclude.value.includes(route.name as string)) {
      keepAliveInclude.value = keepAliveInclude.value.filter((item) => item !== route.name);
    }
    nextTick(() => {
      refreshing.value = false;
      keepAliveInclude.value = [...keepAliveInclude.value, route.name as string];
    });
  };

  /************** end **************/

  /****************************************************************
   * 尺寸
   ****************************************************************/

  // 侧边菜单宽度
  const asideWidth = ref(layoutConfig.asideWidth);
  // 折叠时侧边栏菜单宽度
  const collapsedAsideWidth = ref(layoutConfig.collapsedAsideWidth);
  // 紧凑侧边菜单宽度
  const snugAsideWidth = ref(layoutConfig.snugAsideWidth);
  // 侧边栏宽度
  const sidebarWidth = computed(() => {
    if (isMobile.value) {
      return 0;
    } else {
      if (!sidebarVisible.value) {
        return 0;
      }
      switch (menuType.value) {
        case 'horizontal':
          return 0;
        case 'vertical':
        case 'horizontal-vertical':
          if (defaultMenus.value.length === 0) {
            return 0;
          }
          if (collapse.value) {
            return collapsedAsideWidth.value;
          }
          return asideWidth.value;
        case 'biserial':
        case 'horizontal-biserial': {
          const snugAsideW = snugMenus.value.length === 0 ? 0 : snugAsideWidth.value;
          const asideW =
            defaultMenus.value.length === 0
              ? 0
              : collapse.value
                ? collapsedAsideWidth.value
                : asideWidth.value;
          return snugAsideW + asideW;
        }
        default:
          return 0;
      }
    }
  });

  // 顶部栏高度
  const topbarHeight = ref(layoutConfig.topbarHeight);
  // 标签栏高度
  const tabbarHeight = ref(layoutConfig.tabbarHeight);
  // 头部高度
  const headerHeight = computed(() => {
    return topbarHeight.value + (tabbarVisible.value ? tabbarHeight.value : 0);
  });

  /************** end **************/

  return {
    sidebarVisible,
    collapse,
    isMobile,

    menuType,
    includeHorizontal,
    isVertical,
    isBiserial,
    isHorizontal,
    isHorizontalVertical,
    isHorizontalBiserial,
    menus,
    menusMap,
    firstLevelMenus,
    firstLevelActive,
    secondLevelMenus,
    secondLevelActive,
    thirdLevelMenus,
    topMenus,
    topActive,
    snugMenus,
    snugActive,
    defaultMenus,

    tabbarVisible,
    activeTab,
    refreshing,
    tabList,
    iframeTabList,
    keepAliveInclude,
    keepAliveExclude,
    keepAlive,
    updateKeepAliveInclude,
    reload,

    asideWidth,
    collapsedAsideWidth,
    snugAsideWidth,
    sidebarWidth,

    topbarHeight,
    tabbarHeight,
    headerHeight,
  };
});
