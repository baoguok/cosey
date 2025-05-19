<template>
  <component :is="template"></component>
</template>

<script setup lang="tsx">
import { computed, mergeProps, ref, useAttrs } from 'vue';
import { type MediaCardExpose, type MediaCardProps, type MediaCardSlots } from './media-card';
import { getFileType, defineTemplate, getBasename } from '../../utils';
import ImageCard from '../image-card/image-card.vue';
import VideoCard from '../video-card/video-card.vue';
import AudioCard from '../audio-card/audio-card.vue';
import FileCard from '../file-card/file-card.vue';

defineOptions({
  name: 'MediaCard',
  inheritAttrs: false,
});

const props = defineProps<MediaCardProps>();

const attrs = useAttrs() as any;

const mediaRef = ref();

const mergedName = computed(() => {
  return props.name || getBasename(String(props.src) || '');
});

const mergedProps = computed(() => {
  return mergeProps(props, attrs, {
    name: mergedName.value,
  });
});

const mergedType = computed(() => {
  return props.type || getFileType(String(props.src) || '');
});

const slots = defineSlots<MediaCardSlots>();

const template = defineTemplate(() => {
  switch (mergedType.value) {
    case 'image':
      return <ImageCard {...mergedProps.value} ref={mediaRef} v-slots={slots}></ImageCard>;
    case 'video':
      return <VideoCard {...mergedProps.value} ref={mediaRef}></VideoCard>;
    case 'audio':
      return <AudioCard {...mergedProps.value} ref={mediaRef}></AudioCard>;
    default:
      return <FileCard {...mergedProps.value}></FileCard>;
  }
});

defineExpose<MediaCardExpose>({
  view() {
    mediaRef.value?.view();
  },
});
</script>
