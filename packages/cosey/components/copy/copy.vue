<template>
  <el-button
    link
    :class="[hashId, prefixCls, { 'is-copied': copied }]"
    :style="{ color: color }"
    @click="copy(text || '')"
  >
    <Icon :name="copied ? 'co:checkmark' : 'co:copy'" :class="`${prefixCls}-icon`" />
  </el-button>
</template>

<script setup lang="ts">
import { type CopyProps, type CopySlots, type CopyEmits, type CopyExpose } from './copy';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';
import Icon from '../icon';
import { useClipboard } from '@vueuse/core';
import { ElButton } from 'element-plus';

defineOptions({
  name: 'Copy',
});

const props = defineProps<CopyProps>();

defineSlots<CopySlots>();

defineEmits<CopyEmits>();

const { prefixCls } = useComponentConfig('copy', props);

const { hashId } = useStyle(prefixCls);

const { copy, copied } = useClipboard();

defineExpose<CopyExpose>();
</script>
