<template>
  <div :class="[hashId, prefixCls]" :style="contentStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useLayoutStore } from '../../store';
import useStyle from './style';
import { useComponentConfig } from '../../components';

defineOptions({
  name: 'LayoutContent',
});

const { prefixCls } = useComponentConfig('layout-content');

const { hashId } = useStyle(prefixCls);

const layoutStore = useLayoutStore();

const contentStyle = computed(() => {
  return {
    marginInlineStart: layoutStore.sidebarWidth + 'px',
  };
});
</script>
