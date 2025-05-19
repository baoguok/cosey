import { withInstall } from '../utils';
import Row from './row.vue';

export * from './row';

const _Row = withInstall(Row);

export { _Row as Row };
export default _Row;
