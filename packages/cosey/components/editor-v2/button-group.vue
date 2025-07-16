<template>
  <div :class="`${prefixCls}`">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useComponentConfig } from '../config-provider';

const { prefixCls } = useComponentConfig('editor-button-group');
</script>
