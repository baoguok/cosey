<template>
  <span :class="[hashId, prefixCls]">
    <Icon name="co:close-large" />
  </span>
</template>

<script setup lang="ts">
import Icon from '../icon/icon.vue';
import { type CloseProps } from './close';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'Close',
});

const props = defineProps<CloseProps>();

const { prefixCls } = useComponentConfig('close', props);

const { hashId } = useStyle(prefixCls);
</script>
