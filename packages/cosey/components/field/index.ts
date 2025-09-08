import { withInstall } from '../utils';
import Field from './field';

export * from './field.api';

const _Field = withInstall(Field);

export { _Field as Field };
export default _Field;
