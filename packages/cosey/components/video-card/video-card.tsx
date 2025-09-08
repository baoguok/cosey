import { defineComponent, ref } from 'vue';
import { type VideoCardExpose, videoCardProps, videoCardEmits } from './video-card.api';
import { useLockscreen } from 'element-plus';
import VideoViewer from '../video-viewer/video-viewer';
import Icon from '../icon/icon.vue';
import useStyle from './video-card.style';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoVideoCard',
  inheritAttrs: false,
  props: videoCardProps,
  emits: videoCardEmits,
  setup(props, { emit, attrs }) {
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

    return () => {
      return (
        <>
          <div
            {...attrs}
            class={[hashId.value, prefixCls.value, `is-${props.size}`]}
            title={props.title || props.src}
            onClick={openViewer}
          >
            <video src={props.src} class={`${prefixCls.value}-video`} />
            <div class={`${prefixCls.value}-play-mask`}>
              <Icon name="co:play-circle-outline" class={`${prefixCls.value}-play-icon`} />
            </div>
          </div>

          {viewerVisible.value && <VideoViewer src={props.src} onClose={closeViewer} />}
        </>
      );
    };
  },
});
