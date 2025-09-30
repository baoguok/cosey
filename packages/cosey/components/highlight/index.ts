import { withInstall } from '../utils';
import Highlight from './highlight';

export * from './highlight.api';

const _Highlight = withInstall(Highlight);

export { _Highlight as Highlight };
export default _Highlight;
