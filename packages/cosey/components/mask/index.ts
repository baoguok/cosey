import { withInstall } from '../utils';
import Mask from './mask';

export * from './mask.api';

const _Mask = withInstall(Mask);

export { _Mask as Mask };
export default _Mask;
