import { withInstall } from '../utils';
import MediaViewer from './media-viewer.vue';

export * from './media-viewer';

const _MediaViewer = withInstall(MediaViewer);

export { _MediaViewer as MediaViewer };
export default _MediaViewer;
