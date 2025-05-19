<template>
  <div :class="`${prefixCls}-divider`"></div>
</template>

<script lang="ts" setup>
import { useComponentConfig } from '../config-provider';

const { prefixCls } = useComponentConfig('context-menu');
</script>
