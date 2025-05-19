import { withInstall } from '../utils';
import Highlight from './highlight.vue';

export * from './highlight';

const _Highlight = withInstall(Highlight);

export { _Highlight as Highlight };
export default _Highlight;
