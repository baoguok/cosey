<template>
  <div :class="[hashId, prefixCls]" :style="mainStyle">
    <MergedLayoutIframe />
    <router-view v-slot="{ Component, route }">
      <MergedLayoutSwitchEffect>
        <keep-alive :include="layoutStore.keepAliveInclude" :exclude="layoutStore.keepAliveExclude">
          <component v-if="!layoutStore.refreshing" :is="Component" :key="route.path" />
        </keep-alive>
      </MergedLayoutSwitchEffect>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MergedLayoutIframe from '../merged/layout-iframe';
import MergedLayoutSwitchEffect from '../merged/layout-switch-effect';
import { useLayoutStore } from '../../store';

import useStyle from './style';
import { useComponentConfig } from '../../components';

defineOptions({
  name: 'LayoutMain',
});

const { prefixCls } = useComponentConfig('layout-main');

const { hashId } = useStyle(prefixCls);

const layoutStore = useLayoutStore();

const mainStyle = computed(() => {
  return {
    marginBlockStart: layoutStore.headerHeight + 'px',
  };
});
</script>
