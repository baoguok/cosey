<template>
  <div :class="[hashId, prefixCls]">
    <ElInput v-model="start" type="number" :placeholder="startPlaceholder" />
    <span>-</span>
    <ElInput v-model="end" type="number" :placeholder="endPlaceholder" />
  </div>
</template>

<script setup lang="ts">
import {
  type InputNumberRangeProps,
  type InputNumberRangeSlots,
  type InputNumberRangeEmits,
  type InputNumberRangeExpose,
} from './input-number-range';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';
import { ElInput } from 'element-plus';
import { ref, watch } from 'vue';

defineOptions({
  name: 'InputNumberRange',
});

const props = defineProps<InputNumberRangeProps>();

defineSlots<InputNumberRangeSlots>();

const emit = defineEmits<InputNumberRangeEmits>();

const { prefixCls } = useComponentConfig('input-number-range', props);

const { hashId } = useStyle(prefixCls);

const start = ref();
const end = ref();

watch([start, end], () => {
  const value = start.value && end.value ? [+start.value, +end.value] : undefined;

  emit('update:modelValue', value);
  emit('change', value);
});

defineExpose<InputNumberRangeExpose>();
</script>
