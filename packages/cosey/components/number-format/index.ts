import { withInstall } from '../utils';
import NumberFormat from './number-format.vue';

export * from './number-format';

const _NumberFormat = withInstall(NumberFormat);

export { _NumberFormat as NumberFormat };
export default _NumberFormat;
