<template>
  <transition :name="`${prefixCls}-fade`" appear mode="out-in">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
import useStyle from './style';
import { useComponentConfig } from '../../components';

defineOptions({
  name: 'CoLayoutSwitchEffect',
});

const { prefixCls } = useComponentConfig('layout-main');

useStyle(prefixCls);
</script>
