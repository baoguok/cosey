<template>
  <div
    v-bind="$attrs"
    :class="[hashId, prefixCls, `is-${size}`]"
    :title="title || src"
    @click="openViewer"
  >
    <Icon name="co:volume-up" />
    <div :class="[`${prefixCls}-filename`]">
      {{ name }}
    </div>
  </div>

  <AudioViewer v-if="viewerVisible" :src="src" @close="closeViewer" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  type AudioCardProps,
  type AudioCardEmits,
  type AudioCardExpose,
  defaultAudioCardProps,
} from './audio-card';
import { useLockscreen } from 'element-plus';
import Icon from '../icon/icon.vue';
import AudioViewer from '../audio-viewer/audio-viewer.vue';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'AudioCard',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<AudioCardProps>(), defaultAudioCardProps);

const emit = defineEmits<AudioCardEmits>();

const { prefixCls } = useComponentConfig('audio-card', props);

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

defineExpose<AudioCardExpose>({
  view() {
    openViewer();
  },
});
</script>
