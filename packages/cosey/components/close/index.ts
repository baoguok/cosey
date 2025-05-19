import { withInstall } from '../utils';
import Close from './close.vue';

export * from './close';

const _Close = withInstall(Close);

export { _Close as Close };
export default _Close;
