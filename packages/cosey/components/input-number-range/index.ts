import { withInstall } from '../utils';
import InputNumberRange from './input-number-range.vue';

export * from './input-number-range';

const _InputNumberRange = withInstall(InputNumberRange);

export { _InputNumberRange as InputNumberRange };
export default _InputNumberRange;
