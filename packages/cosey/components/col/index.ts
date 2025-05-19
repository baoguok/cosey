import { withInstall } from '../utils';
import Col from './col.vue';

export * from './col';

const _Col = withInstall(Col);

export { _Col as Col };
export default _Col;
