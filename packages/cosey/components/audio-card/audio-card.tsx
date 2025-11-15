import { defineComponent, ref } from 'vue';
import { useLockscreen } from 'element-plus';
import { audioCardProps, audioCardEmits } from './audio-card.api';
import Icon from '../icon/icon';
import AudioViewer from '../audio-viewer/audio-viewer';
import useStyle from './audio-card.style';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoAudioCard',
  inheritAttrs: false,
  props: audioCardProps,
  emits: audioCardEmits,
  setup(props, { attrs, emit, expose }) {
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

    expose({
      view() {
        openViewer();
      },
    });

    return () => {
      return (
        <>
          <div
            {...attrs}
            class={[hashId.value, prefixCls.value, `is-${props.size}`]}
            title={props.title || props.src}
            onClick={() => openViewer()}
          >
            <Icon name="co:volume-up" />
            <div class={[`${prefixCls.value}-filename`]}>{props.name}</div>
          </div>

          {viewerVisible.value && <AudioViewer src={props.src} onClose={() => closeViewer()} />}
        </>
      );
    };
  },
});
