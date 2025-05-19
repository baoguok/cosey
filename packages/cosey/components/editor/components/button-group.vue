<template>
  <div :class="`${prefixCls}-group`">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useComponentConfig } from '../../config-provider';

const { prefixCls } = useComponentConfig('editor-button');
</script>
