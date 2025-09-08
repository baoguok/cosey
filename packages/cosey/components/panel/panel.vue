<template>
  <div :class="[hashId, prefixCls]">
    <div v-if="$slots.header || header" :class="`${prefixCls}-header`">
      <slot name="header">
        {{ header }}
      </slot>
    </div>
    <el-scrollbar always :max-height="maxHeight">
      <div :class="`${prefixCls}-body`">
        <slot></slot>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { type PanelProps, type PanelSlots } from './panel';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'CoPanel',
});

const props = defineProps<PanelProps>();

defineSlots<PanelSlots>();

const { prefixCls } = useComponentConfig('panel', props);

const { hashId } = useStyle(prefixCls);
</script>
