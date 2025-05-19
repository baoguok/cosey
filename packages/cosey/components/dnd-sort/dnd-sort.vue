<template>
  <component v-if="tag" :is="tag" v-bind="$attrs">
    <slot></slot>
  </component>
  <slot v-else></slot>
</template>

<script lang="tsx" setup>
import { type DndSortProps, type DndSortSlots, type DndSortEmits } from './dnd-sort';
import { toRef } from 'vue';
import { useDndSort } from './useDndSort';

defineOptions({
  name: 'DndSort',
  inheritAttrs: false,
});

const props = defineProps<DndSortProps>();

defineSlots<DndSortSlots>();

const emit = defineEmits<DndSortEmits>();

useDndSort({
  onMove(fromIndex, toIndex) {
    emit('move', fromIndex, toIndex);
  },
  disabled: toRef(() => props.disabled),
});
</script>
