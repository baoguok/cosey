import { withInstall } from '../utils';
import InputNumberRange from './input-number-range';

export * from './input-number-range.api';

const _InputNumberRange = withInstall(InputNumberRange);

export { _InputNumberRange as InputNumberRange };
export default _InputNumberRange;
