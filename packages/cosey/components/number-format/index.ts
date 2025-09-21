import { withInstall } from '../utils';
import NumberFormat from './number-format';

export * from './number-format.api';

const _NumberFormat = withInstall(NumberFormat);

export { _NumberFormat as NumberFormat };
export default _NumberFormat;
