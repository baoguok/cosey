import { withInstall } from '../utils';
import LongText from './long-text.vue';

export * from './long-text';

const _LongText = withInstall(LongText);

export { _LongText as LongText };
export default _LongText;
