<template>
  <div :class="[hashId, prefixCls, `is-${size}`]" :title="title || src">
    <Icon name="co:document" />
    <div :class="[`${prefixCls}-filename`]">
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../icon/icon.vue';
import { type FileCardProps, type FileCardSlots, defaultFileCardProps } from './file-card';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'FileCard',
});

const props = withDefaults(defineProps<FileCardProps>(), defaultFileCardProps);

defineSlots<FileCardSlots>();

const { prefixCls } = useComponentConfig('file-card', props);

const { hashId } = useStyle(prefixCls);
</script>
