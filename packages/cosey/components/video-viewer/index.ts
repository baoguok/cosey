import { withInstall } from '../utils';
import VideoViewer from './video-viewer.vue';

export * from './video-viewer';

const _VideoViewer = withInstall(VideoViewer);

export { _VideoViewer as VideoViewer };
export default _VideoViewer;
