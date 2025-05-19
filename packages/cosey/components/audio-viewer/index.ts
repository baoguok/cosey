import { withInstall } from '../utils';
import AudioViewer from './audio-viewer.vue';

export * from './audio-viewer';

const _AudioViewer = withInstall(AudioViewer);

export { _AudioViewer as AudioViewer };
export default _AudioViewer;
