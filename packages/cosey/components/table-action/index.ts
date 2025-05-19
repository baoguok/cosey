import { withInstall } from '../utils';
import TableAction from './table-action.vue';

export * from './table-action';

const _TableAction = withInstall(TableAction);

export { _TableAction as TableAction };
export default _TableAction;
