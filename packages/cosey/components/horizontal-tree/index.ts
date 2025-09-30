import { withInstall } from '../utils';
import HorizontalTree from './horizontal-tree';

export * from './horizontal-tree.api';

const _HorizontalTree = withInstall(HorizontalTree);

export { _HorizontalTree as HorizontalTree };
export default _HorizontalTree;
