<template>
  <div :class="[hashId, prefixCls]" />
</template>

<script setup lang="ts">
import { type MaskProps } from './mask';

import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'Mask',
});

defineProps<MaskProps>();

const { prefixCls } = useComponentConfig('mask');

const { hashId } = useStyle(prefixCls);
</script>
