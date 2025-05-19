<template>
  <div
    v-bind="$attrs"
    :class="[hashId, prefixCls, `is-${size}`]"
    :title="title || src"
    @click="openViewer"
  >
    <video :src="src" :class="`${prefixCls}-video`" />
    <div :class="`${prefixCls}-play-mask`">
      <Icon name="co:play-filled" :class="`${prefixCls}-play-icon`" />
    </div>
  </div>

  <VideoViewer v-if="viewerVisible" :src="src" @close="closeViewer" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  type VideoCardProps,
  type VideoCardEmits,
  type VideoCardExpose,
  defaultVideoCardProps,
} from './video-card';
import { useLockscreen } from 'element-plus';
import VideoViewer from '../video-viewer/video-viewer.vue';
import Icon from '../icon/icon.vue';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'VideoCard',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VideoCardProps>(), defaultVideoCardProps);

const emit = defineEmits<VideoCardEmits>();

const { prefixCls } = useComponentConfig('video-card', props);

const { hashId } = useStyle(prefixCls);

const viewerVisible = ref(false);

useLockscreen(viewerVisible);

const openViewer = () => {
  viewerVisible.value = true;
  emit('open');
};

function closeViewer() {
  viewerVisible.value = false;
  emit('close');
}

defineExpose<VideoCardExpose>({
  view() {
    openViewer();
  },
});
</script>
