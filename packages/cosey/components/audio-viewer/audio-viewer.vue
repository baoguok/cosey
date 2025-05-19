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

          <audio ref="audio" controls :src="src"></audio>
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
  type AudioViewerProps,
  type AudioViewerSlots,
  type AudioViewerEmits,
  defaultAudioViewerProps,
} from './audio-viewer';
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
import { Mask } from '../mask';
import { Close } from '../close';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'AudioViewer',
});

const props = withDefaults(defineProps<AudioViewerProps>(), defaultAudioViewerProps);

defineSlots<AudioViewerSlots>();

const emit = defineEmits<AudioViewerEmits>();

const { prefixCls } = useComponentConfig('audio-viewer', props);

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

const audioRef = useTemplateRef('audio');

onMounted(() => {
  audioRef.value?.play();
});

onBeforeUnmount(() => {
  audioRef.value?.pause();
});
</script>
