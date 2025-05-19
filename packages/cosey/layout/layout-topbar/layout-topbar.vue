<template>
  <div :style="{ height: `${layoutStore.topbarHeight}px` }" :class="[hashId, prefixCls]">
    <div :class="`${prefixCls}-left`">
      <slot name="left"></slot>
    </div>
    <div :class="`${prefixCls}-right`">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '../../store';

import useStyle from './style';
import { useComponentConfig } from '../../components';

defineOptions({
  name: 'LayoutTopbar',
});

const { prefixCls } = useComponentConfig('layout-topbar');

const { hashId } = useStyle(prefixCls);

const layoutStore = useLayoutStore();
</script>
