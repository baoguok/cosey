<template>
  <el-button link size="small" :class="`${prefixCls}-reload`" @click="layoutStore.reload()">
    <Icon
      name="co:rotate-360"
      size="xl"
      :class="[
        `${prefixCls}-reload-icon`,
        {
          'is-spinning': spinning,
        },
      ]"
    />
  </el-button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElButton } from 'element-plus';
import { Icon, useComponentConfig } from '../../components';
import { useLayoutStore } from '../../store';
import { useTimeoutFn } from '@vueuse/core';

defineOptions({
  name: 'CoLayoutReload',
});

const { prefixCls } = useComponentConfig('layout-tabbar');

const layoutStore = useLayoutStore();

const spinning = ref(layoutStore.refreshing);

const timeout = useTimeoutFn(() => {
  spinning.value = false;
}, 600);

watch(
  () => layoutStore.refreshing,
  () => {
    if (layoutStore.refreshing) {
      spinning.value = true;
      timeout.start();
    }
  },
);
</script>
