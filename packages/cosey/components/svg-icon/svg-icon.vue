<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type SvgIconProps } from './svg-icon';

defineOptions({
  name: 'SvgIcon',
});

const props = withDefaults(defineProps<SvgIconProps>(), {});

const symbolId = computed(() => `#icon-${props.name}`);
</script>
