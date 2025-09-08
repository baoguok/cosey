import { useZIndex } from 'element-plus';
import ElTeleport from 'element-plus/es/components/teleport/index';
import ElFocusTrap from 'element-plus/es/components/focus-trap/index';
import { videoViewerProps, videoViewerSlots, videoViewerEmits } from './video-viewer.api';
import { defineComponent, onBeforeUnmount, onMounted, ref, Transition, useTemplateRef } from 'vue';
import { Close } from '../close';
import { Mask } from '../mask';

import useStyle from './video-viewer.style';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoVideoViewer',
  props: videoViewerProps,
  slots: videoViewerSlots,
  emits: videoViewerEmits,
  setup(props, { emit }) {
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

    const videoRef = useTemplateRef<HTMLVideoElement>('video');

    onMounted(() => {
      videoRef.value?.play();
    });

    onBeforeUnmount(() => {
      videoRef.value?.pause();
    });

    return () => {
      return (
        <ElTeleport to="body" disabled={!props.teleported}>
          <Transition name="co-viewer-fade" appear>
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

                <video
                  ref="video"
                  controls
                  src={props.src}
                  class={`${prefixCls.value}-video`}
                ></video>
              </ElFocusTrap>
            </div>
          </Transition>
        </ElTeleport>
      );
    };
  },
});
