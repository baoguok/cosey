import { withInstall } from '../utils';
import Ribbon from './ribbon';

export * from './ribbon.api';

const _Ribbon = withInstall(Ribbon);

export { _Ribbon as Ribbon };
export default _Ribbon;
