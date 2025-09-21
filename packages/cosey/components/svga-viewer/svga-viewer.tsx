import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { omit } from 'lodash-es';
import { Parser, Player } from 'svga';
import { svgaViewerEmits, svgaViewerProps, svgaViewerSlots } from './svga-viewer.api';
import { MediaViewerDialog } from '../media-viewer/media-viewer-dialog';
import { ElIcon } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';
import { useToken } from '..';

export default defineComponent({
  name: 'CoSvgaViewer',
  props: svgaViewerProps,
  slots: svgaViewerSlots,
  emits: svgaViewerEmits,
  setup(props, { emit }) {
    const canvasRef = ref<HTMLCanvasElement>();

    const loading = ref(false);

    const { token } = useToken();

    onMounted(async () => {
      try {
        loading.value = true;
        const parser = new Parser();
        const svga = await parser.load(props.src!);
        canvasRef.value!.width = svga.size.width;
        canvasRef.value!.height = svga.size.height;

        const player = new Player(canvasRef.value!);
        await player.mount(svga);

        player.start();
      } finally {
        loading.value = false;
      }
    });

    onBeforeUnmount(() => {});

    return () => {
      return (
        <MediaViewerDialog {...omit(props, 'src')} onClose={() => emit('close')}>
          <ElIcon
            v-show={loading.value}
            class="is-loading"
            color={token.value.colorWhite}
            size={token.value.sizeXL}
          >
            <Loading />
          </ElIcon>
          <canvas v-show={!loading.value} ref={canvasRef}></canvas>
        </MediaViewerDialog>
      );
    };
  },
});
