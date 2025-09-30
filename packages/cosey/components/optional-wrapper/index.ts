import { withInstall } from '../utils';
import OptionalWrapper from './optional-wrapper';

const _OptionalWrapper = withInstall(OptionalWrapper);

export { _OptionalWrapper as OptionalWrapper };
export default _OptionalWrapper;
