import { defineComponent, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
import { useZIndex } from 'element-plus';
import ElTeleport from 'element-plus/es/components/teleport/index';
import ElFocusTrap from 'element-plus/es/components/focus-trap/index';
import { audioViewerEmits, audioViewerProps, audioViewerSlots } from './audio-viewer.api';
import { Mask } from '../mask';
import { Close } from '../close';
import useStyle from './audio-viewer.style';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoAudioViewer',
  props: audioViewerProps,
  slots: audioViewerSlots,
  emits: audioViewerEmits,
  setup(props, { emit }) {
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

    const audioRef = useTemplateRef<HTMLAudioElement>('audio');

    onMounted(() => {
      audioRef.value?.play();
    });

    onBeforeUnmount(() => {
      audioRef.value?.pause();
    });

    return () => {
      return (
        <ElTeleport to="body" disabled={!props.teleported}>
          <transition name="co-viewer-fade" appear>
            <div
              ref="wrapper"
              tabindex={-1}
              class={[hashId.value, prefixCls.value]}
              style={{ zIndex: zIndex.value }}
            >
              <ElFocusTrap
                loop
                trapped
                focus-trap-el={wrapper}
                focus-start-el="container"
                onFocusout-prevented={onFocusoutPrevented}
                onRelease-requested={onCloseRequested}
              >
                <Mask onClick={() => props.hideOnClickModal && hide()} />

                <Close onClick={() => hide()} />

                <audio ref="audio" controls src={props.src}></audio>
              </ElFocusTrap>
            </div>
          </transition>
        </ElTeleport>
      );
    };
  },
});
