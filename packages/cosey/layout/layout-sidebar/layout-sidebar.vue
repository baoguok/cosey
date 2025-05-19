<template>
  <div ref="sidebar" :class="[hashId, prefixCls]" :style="sidebarStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutStore } from '../../store';
import useStyle from './style';
import { useComponentConfig } from '../../components';

defineOptions({
  name: 'LayoutSidebar',
});

const { prefixCls } = useComponentConfig('layout-sidebar');

const { hashId } = useStyle(prefixCls);

const layoutStore = useLayoutStore();

const sidebarStyle = computed(() => {
  const marginTop =
    layoutStore.isMobile || !layoutStore.includeHorizontal ? 0 : layoutStore.topbarHeight;

  return {
    marginTop: marginTop + 'px',
    height: `calc(100vh - ${marginTop}px)`,
    transform: !layoutStore.sidebarVisible ? 'translateX(-100%)' : undefined,
  };
});
</script>
