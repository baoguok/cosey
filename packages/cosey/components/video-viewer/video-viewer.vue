<template>
  <el-teleport to="body" :disabled="!teleported">
    <transition name="co-viewer-fade" appear>
      <div ref="wrapper" :tabindex="-1" :class="[hashId, prefixCls]" :style="{ zIndex }">
        <el-focus-trap
          loop
          trapped
          :focus-trap-el="wrapper"
          focus-start-el="container"
          @focusout-prevented="onFocusoutPrevented"
          @release-requested="onCloseRequested"
        >
          <Mask @click="hideOnClickModal && hide()" />

          <Close @click="hide" />

          <video ref="video" controls :src="src" :class="`${prefixCls}-video`"></video>
        </el-focus-trap>
      </div>
    </transition>
  </el-teleport>
</template>

<script setup lang="ts">
import { useZIndex } from 'element-plus';
import ElTeleport from 'element-plus/es/components/teleport/index';
import ElFocusTrap from 'element-plus/es/components/focus-trap/index';
import {
  type VideoViewerProps,
  type VideoViewerSlots,
  type VideoViewerEmits,
  defaultVideoViewerProps,
} from './video-viewer';
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
import { Close } from '../close';
import { Mask } from '../mask';

import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'VideoViewer',
});

const props = withDefaults(defineProps<VideoViewerProps>(), defaultVideoViewerProps);

defineSlots<VideoViewerSlots>();

const emit = defineEmits<VideoViewerEmits>();

const { prefixCls } = useComponentConfig('video-viewer');

const { hashId } = useStyle(prefixCls);

const { nextZIndex } = useZIndex();

const wrapper = ref<HTMLDivElement>();

const zIndex = ref(props.zIndex ?? nextZIndex());

function onFocusoutPrevented(event: CustomEvent) {
  if (event.detail?.focusReason === 'pointer') {
    event.preventDefault();
  }
}

function onCloseRequested() {
  if (props.closeOnPressEscape) {
    hide();
  }
}

function hide() {
  emit('close');
}

const videoRef = useTemplateRef('video');

onMounted(() => {
  videoRef.value?.play();
});

onBeforeUnmount(() => {
  videoRef.value?.pause();
});
</script>
