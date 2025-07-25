import { withInstall } from '../utils';
import Table from './table.vue';

export * from './table';
export * from './table-column/table-column';
export * from './table-query/table-query';
export * from './useTable';

const _Table = withInstall(Table);

export { _Table as Table };
export default _Table;
