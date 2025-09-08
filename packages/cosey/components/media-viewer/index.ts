import { withInstall } from '../utils';
import MediaViewer from './media-viewer';

export * from './media-viewer.api';

const _MediaViewer = withInstall(MediaViewer);

export { _MediaViewer as MediaViewer };
export default _MediaViewer;
