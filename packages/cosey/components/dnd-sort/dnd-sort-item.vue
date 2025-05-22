<template>
  <div ref="itemRef" v-bind="itemBinder">
    <div :class="[hashId, `${prefixCls}-item`]">
      <slot name="prepend"></slot>
      <div
        v-if="!disabled"
        ref="holderRef"
        v-bind="holderBinder"
        :class="`${prefixCls}-item-holder`"
      >
        <Icon name="co:draggable" size="lg" />
      </div>
      <div :class="`${prefixCls}-item-content`">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { type DndSortItemSlots, type DndSortItemProps } from './dnd-sort-item';
import { reactive, toRef } from 'vue';
import { useDndSortItem } from './useDndSortItem';
import Icon from '../icon/icon.vue';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'DndSortItem',
});

const props = defineProps<DndSortItemProps>();

defineSlots<DndSortItemSlots>();

const { prefixCls } = useComponentConfig('dnd-sort', props);

const { hashId } = useStyle(prefixCls);

const { disabled, itemRef, holderRef, itemBinder, holderBinder } = useDndSortItem(
  reactive({
    index: toRef(() => props.index),
  }),
);
</script>
