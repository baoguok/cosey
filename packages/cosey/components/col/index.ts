import { withInstall } from '../utils';
import Col from './col';

export * from './col.api';

const _Col = withInstall(Col);

export { _Col as Col };
export default _Col;
