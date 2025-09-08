<template>
  <InternalTransition name="fade">
    <div
      v-show="layoutStore.sidebarVisible"
      :class="[hashId, prefixCls]"
      @click="layoutStore.sidebarVisible = false"
    ></div>
  </InternalTransition>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '../../store';
import useStyle from './style';
import { useComponentConfig, Transition as InternalTransition } from '../../components';

defineOptions({
  name: 'CoLayoutMask',
});

const { prefixCls } = useComponentConfig('layout-mask');

const { hashId } = useStyle(prefixCls);

const layoutStore = useLayoutStore();
</script>
