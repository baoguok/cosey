import { withInstall } from '../utils';
import Field from './field.vue';

export * from './field';

const _Field = withInstall(Field);

export { _Field as Field };
export default _Field;
