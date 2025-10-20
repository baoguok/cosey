import { withInstall } from '../utils';
import Descriptions from './descriptions';

export * from './descriptions';

const _Descriptions = withInstall(Descriptions);

export { _Descriptions as Descriptions };
export default _Descriptions;
