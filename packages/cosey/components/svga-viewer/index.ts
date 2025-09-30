import { withInstall } from '../utils';
import SvgaViewer from './svga-viewer';

export * from './svga-viewer';

const _SvgaViewer = withInstall(SvgaViewer);

export { _SvgaViewer as SvgaViewer };
export default _SvgaViewer;
