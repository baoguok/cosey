import { withInstall } from '../utils';
import TableAction from './table-action';

export * from './table-action.api';

const _TableAction = withInstall(TableAction);

export { _TableAction as TableAction };
export default _TableAction;
