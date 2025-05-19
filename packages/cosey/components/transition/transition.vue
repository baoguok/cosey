<template>
  <VueTransition v-bind="mergedProps">
    <slot></slot>
  </VueTransition>
</template>

<script setup lang="ts">
import { type TransitionProps, type TransitionSlots } from './transition';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';
import { reactiveOmit } from '@vueuse/core';
import { computed, Transition as VueTransition } from 'vue';

defineOptions({
  name: 'Transition',
});

const props = withDefaults(defineProps<TransitionProps>(), {
  name: 'fade',
  css: true,
});

defineSlots<TransitionSlots>();

const { prefixCls } = useComponentConfig('transition');

const { hashId } = useStyle(prefixCls);

const vueTransProps = reactiveOmit(props, 'name');

const mergedProps = computed(() => {
  const transitionName = `${hashId.value} ${prefixCls.value}-${props.name}`;
  return {
    ...vueTransProps,
    enterFromClass: `${transitionName}-enter-from`,
    enterActiveClass: `${transitionName}-enter-active`,
    enterToClass: `${transitionName}-enter-to`,
    leaveFromClass: `${transitionName}-leave-from`,
    leaveActiveClass: `${transitionName}-leave-active`,
    leaveToClass: `${transitionName}-leave-to`,
  };
});
</script>
