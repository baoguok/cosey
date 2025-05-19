<template>
  <div
    :class="[hashId, prefixCls]"
    :style="{
      height,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { type ContainerSlots, type ContainerProps } from './container';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';
import { computed, inject } from 'vue';
import { containerContextKey } from './container';

defineOptions({
  name: 'Container',
});

const props = defineProps<ContainerProps>();

defineSlots<ContainerSlots>();

const { prefixCls } = useComponentConfig('container', props);

const { hashId } = useStyle(prefixCls);

const context = inject(containerContextKey, null);

const height = computed(() => {
  return props.fullPage ? context?.height || '100vh' : undefined;
});
</script>
