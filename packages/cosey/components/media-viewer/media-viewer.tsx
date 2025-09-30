import { defineComponent, type SlotsType } from 'vue';
import { type MediaViewerSlots, mediaViewerProps, mediaViewerEmits } from './media-viewer.api';

export default defineComponent({
  name: 'MediaViewer',
  props: mediaViewerProps,
  slots: Object as SlotsType<MediaViewerSlots>,
  emits: mediaViewerEmits,
  setup() {
    return () => <div></div>;
  },
});
