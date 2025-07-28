<template>
  <div :class="[hashId, prefixCls]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { type CardProps, type CardSlots, type CardEmits, type CardExpose } from './card';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'Card',
});

const props = defineProps<CardProps>();

defineSlots<CardSlots>();

defineEmits<CardEmits>();

const { prefixCls } = useComponentConfig('card', props);

const { hashId } = useStyle(prefixCls);

defineExpose<CardExpose>();
</script>
