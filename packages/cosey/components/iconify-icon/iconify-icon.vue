<template>
  <svg :viewBox="viewBox" aria-hidden="true" v-html="path"></svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { iconifyIconsSets, type IconifyIconProps } from './iconify-icon';

defineOptions({
  name: 'CoIconifyIcon',
});

const props = defineProps<IconifyIconProps>();

const iconSet = computed(() => iconifyIconsSets[props.prefix]);

const viewBox = computed(() => `0 0 ${iconSet.value?.width ?? 16} ${iconSet.value?.height ?? 16}`);

const path = computed(() => {
  const icon = iconSet.value?.icons[props.name];
  return icon?.body;
});
</script>
