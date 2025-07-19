<template>
  <div ref="sidebar" :class="[hashId, prefixCls]" :style="sidebarStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { useLayoutStore } from '../../store';
import useStyle from './style';
import { useComponentConfig } from '../../components';
import { useDir } from '../../hooks';

defineOptions({
  name: 'LayoutSidebar',
});

const { prefixCls } = useComponentConfig('layout-sidebar');

const { hashId } = useStyle(prefixCls);

const layoutStore = useLayoutStore();

const sidebarRef = useTemplateRef('sidebar');

const dir = useDir(sidebarRef);

const sidebarStyle = computed(() => {
  const marginBlockStart =
    layoutStore.isMobile || !layoutStore.includeHorizontal ? 0 : layoutStore.topbarHeight;

  return {
    marginBlockStart: marginBlockStart + 'px',
    height: `calc(100vh - ${marginBlockStart}px)`,
    transform: !layoutStore.sidebarVisible
      ? `translateX(${dir.value === 'ltr' ? '-100%' : '100%'})`
      : undefined,
  };
});
</script>
