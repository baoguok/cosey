import { withInstall } from '../utils';
import Close from './close';

export * from './close.api';

const _Close = withInstall(Close);

export { _Close as Close };
export default _Close;
