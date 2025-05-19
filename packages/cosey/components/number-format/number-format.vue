<template>
  <span>
    {{ displayValue }}
  </span>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, toRef, watch } from 'vue';
import {
  type NumberFormatProps,
  type NumberFormatSlots,
  type NumberFormatEmits,
  type NumberFormatExpose,
  defaultNumberFormatProps,
} from './number-format';
import { TransitionPresets, useTransition } from '@vueuse/core';

defineOptions({
  name: 'NumberFormat',
});

const props = withDefaults(defineProps<NumberFormatProps>(), defaultNumberFormatProps);

defineSlots<NumberFormatSlots>();

defineEmits<NumberFormatEmits>();

const numValue = ref(0);

watch(
  () => props.value,
  () => {
    nextTick(() => {
      numValue.value = Number(props.value) || 0;
    });
  },
  {
    immediate: true,
  },
);

const animatedValue = useTransition(
  numValue,
  reactive({
    duration: toRef(() => props.duration),
    disabled: toRef(() => !props.animate),
    transition: TransitionPresets.easeInOutQuint,
  }),
);

const displayValue = computed(() => {
  let value = Intl.NumberFormat(props.locales, {
    style: props.type,
    currency: props.currency,
  }).format(animatedValue.value);

  let [integer, decimal = ''] = value.split('.');
  decimal = decimal.padEnd(props.precision, '0').slice(0, props.precision);
  value = [integer, decimal].join(decimal ? '.' : '');

  return props.beforeDisplay ? props.beforeDisplay(value) : value;
});

defineExpose<NumberFormatExpose>();
</script>
