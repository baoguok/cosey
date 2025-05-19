import { withInstall } from '../utils';
import DndSort from './dnd-sort.vue';
import DndSortItem from './dnd-sort-item.vue';
import { useDndSortItem } from './useDndSortItem';
import { useDndSort } from './useDndSort';

export * from './dnd-sort';
export * from './dnd-sort-item';

const _DndSort = withInstall(DndSort);
const _DndSortItem = withInstall(DndSortItem);

export { _DndSortItem as DndSortItem, _DndSort as DndSort, useDndSortItem, useDndSort };
export default _DndSort;
