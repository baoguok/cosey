<template>
  <div v-if="layoutStore.tabbarVisible" :class="[hashId, prefixCls]" :style="tabbarStyle">
    <div :class="`${prefixCls}-tabs-wrapper`">
      <el-tabs
        v-model="layoutStore.activeTab"
        type="card"
        :style="{ '--el-border-color-light': token.colorBorder }"
        @tab-remove="onTabRemove"
      >
        <el-tab-pane
          v-for="(item, index) in layoutStore.tabList"
          :key="item.name"
          :name="item.name"
          :closable="item.meta.closable"
        >
          <template #label>
            <Icon v-if="item.meta.icon" :name="item.meta.icon" :class="`${prefixCls}-icon`" />
            {{ item.meta.title }}

            <ContextMenu>
              <template #reference>
                <div :class="`${prefixCls}-context-menu-reference`"></div>
              </template>
              <ContextMenuItem
                title="重新加载"
                icon="co:rotate-360"
                :disabled="item.name !== layoutStore.activeTab"
                @click="layoutStore.reload()"
              />
              <ContextMenuItem
                title="关闭"
                icon="co:close-large"
                :disabled="!item.meta.closable"
                divided
                @click="closeTab(item.name)"
              />
              <ContextMenuItem
                title="关闭左侧标签页"
                :disabled="index === 0 || index === 1"
                @click="closeLeftTabs(item.name, index)"
              />
              <ContextMenuItem
                title="关闭右侧标签页"
                :disabled="index === layoutStore.tabList.length - 1"
                @click="closeRightTabs(item.name, index)"
              />
              <ContextMenuItem
                title="关闭其他标签页"
                :disabled="
                  layoutStore.tabList.length === 1 ||
                  (layoutStore.tabList.length === 2 && index === 1)
                "
                @click="closeOtherTabs(item.name)"
              />
            </ContextMenu>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div :class="`${prefixCls}-toolbar`">
      <el-divider direction="vertical" />
      <Reload />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalConfig } from '../../config';
import { useLayoutStore } from '../../store';
import { ContextMenu, ContextMenuItem, Icon, useComponentConfig, useToken } from '../../components';
import Reload from './reload.vue';

import useStyle from './style';

defineOptions({
  name: 'LayoutTabbar',
});

const { prefixCls } = useComponentConfig('layout-tabbar');

const { hashId } = useStyle(prefixCls);

const { token } = useToken();

const router = useRouter();
const route = useRoute();

const routerConfig = useGlobalConfig().router;

const layoutStore = useLayoutStore();

layoutStore.activeTab = route.name as string;

const homeRoute = router.getRoutes().find((route) => route.path === routerConfig.homePath);

if (homeRoute) {
  layoutStore.tabList = [{ name: homeRoute.name as string, meta: homeRoute.meta }];
}

if (route.path !== routerConfig.homePath) {
  layoutStore.tabList.push({
    name: route.name as string,
    meta: route.meta,
  });
}

router.afterEach((to) => {
  if (!layoutStore.tabList.find((item) => item.name === to.name)) {
    layoutStore.tabList.push({
      name: to.name as string,
      meta: to.meta,
    });
  }
  layoutStore.activeTab = to.name as string;
});

const closeTab = (name: string | number) => {
  const index = layoutStore.tabList.findIndex((item) => item.name === name);
  layoutStore.tabList.splice(index, 1);
  if (layoutStore.activeTab === name) {
    const item = layoutStore.tabList[Math.min(index, layoutStore.tabList.length - 1)];
    if (item) {
      layoutStore.activeTab = item.name;
    }
  }
};

const closeLeftTabs = (name: string, index: number) => {
  layoutStore.tabList = layoutStore.tabList.filter((item, i) => i >= index || !item.meta.closable);
  if (!layoutStore.tabList.find((item) => item.name === layoutStore.activeTab)) {
    layoutStore.activeTab = name;
  }
};

const closeRightTabs = (name: string, index: number) => {
  layoutStore.tabList = layoutStore.tabList.filter((item, i) => i <= index || !item.meta.closable);
  if (!layoutStore.tabList.find((item) => item.name === layoutStore.activeTab)) {
    layoutStore.activeTab = name;
  }
};

const closeOtherTabs = (name: string) => {
  layoutStore.tabList = layoutStore.tabList.filter(
    (item) => item.name === name || !item.meta.closable,
  );
  layoutStore.activeTab = name;
};

watch(
  () => layoutStore.activeTab,
  () => {
    router.push({
      name: layoutStore.activeTab as string,
    });
  },
);

const onTabRemove = (name: string | number) => {
  closeTab(name);
};

const tabbarStyle = computed(() => {
  const marginLeft = layoutStore.includeHorizontal ? layoutStore.sidebarWidth + 'px' : 0;

  return {
    marginLeft,
  };
});
</script>
