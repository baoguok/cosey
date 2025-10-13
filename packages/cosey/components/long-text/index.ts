import { withInstall } from '../utils';
import LongText from './long-text';

export * from './long-text.api';

const _LongText = withInstall(LongText);

export { _LongText as LongText };
export default _LongText;
