import { defineComponent, ref } from 'vue';
import { useLockscreen } from 'element-plus';
import { svgaCardProps, svgaCardEmits } from './svga-card.api';
import SvgaViewer from '../svga-viewer/svga-viewer';
import useStyle from './svga-card.style';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoSvgaCard',
  inheritAttrs: false,
  props: svgaCardProps,
  emits: svgaCardEmits,
  setup(props, { attrs, emit, expose }) {
    const { prefixCls } = useComponentConfig('svga-card', props);

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
            <div class={`${prefixCls.value}-type`}>svga</div>
            <div class={`${prefixCls.value}-filename`}>{props.name}</div>
          </div>

          {viewerVisible.value && <SvgaViewer src={props.src} onClose={() => closeViewer()} />}
        </>
      );
    };
  },
});
