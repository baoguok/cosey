<template>
  <div
    :class="[
      hashId,
      prefixCls,
      {
        'is-hide': layoutStore.snugMenus.length === 0,
      },
    ]"
    :style="snugAsideStyle"
  >
    <div
      v-if="!layoutStore.includeHorizontal"
      :style="{ height: `${layoutStore.topbarHeight - 1}px` }"
      :class="`${prefixCls}-header`"
    >
      <MergedLayoutBrand hide-name />
    </div>
    <el-scrollbar :class="`${prefixCls}-body`">
      <MergedLayoutSnugMenu />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import MergedLayoutBrand from '../merged/layout-brand';
import MergedLayoutSnugMenu from '../merged/layout-snug-menu';
import { useLayoutStore } from '../../store';

import useStyle from './style';
import { useComponentConfig } from '../../components';

defineOptions({
  name: 'LayoutSnugAside',
});

const { prefixCls } = useComponentConfig('layout-snug-aside');

const { hashId } = useStyle(prefixCls);

const layoutStore = useLayoutStore();

const snugAsideStyle = computed(() => {
  return {
    width: (layoutStore.snugMenus.length === 0 ? 0 : layoutStore.snugAsideWidth) + 'px',
  };
});
</script>
