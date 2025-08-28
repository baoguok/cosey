<template>
  <VueTransitionGroup v-bind="mergedProps" @before-leave="onBeforeLeave">
    <slot></slot>
  </VueTransitionGroup>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { type TransitionGroupProps, type TransitionGroupSlots } from './transition-group';
import { reactiveOmit } from '@vueuse/core';
import { TransitionGroup as VueTransitionGroup } from 'vue';

import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'TransitionGroup',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TransitionGroupProps>(), {
  effect: 'fade',
  css: true,
});

const vueTransGroupProps = reactiveOmit(props, 'effect');

defineSlots<TransitionGroupSlots>();

const { prefixCls } = useComponentConfig('transition-group');

const { hashId } = useStyle(prefixCls);

const mergedProps = computed(() => {
  const transitionName = `${hashId.value} ${prefixCls.value}-${props.effect}`;
  return {
    ...vueTransGroupProps,
    moveClass: `${transitionName}-move`,
    enterFromClass: `${transitionName}-enter-from`,
    enterActiveClass: `${transitionName}-enter-active`,
    enterToClass: `${transitionName}-enter-to`,
    leaveFromClass: `${transitionName}-leave-from`,
    leaveActiveClass: `${transitionName}-leave-active`,
    leaveToClass: `${transitionName}-leave-to`,
  };
});

const onBeforeLeave = (el: Element) => {
  const node = el as HTMLElement;
  const rect = node.getBoundingClientRect();
  node.style.setProperty('position', 'fixed');
  node.style.setProperty('top', rect.top + 'px');
  node.style.setProperty('left', rect.left + 'px');
  node.style.setProperty('opacity', '0');
};
</script>
