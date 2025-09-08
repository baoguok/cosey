import { withInstall } from '../utils';
import DndSort from './dnd-sort';
import DndSortItem from './dnd-sort-item';
import { useDndSortItem } from './useDndSortItem';
import { useDndSort } from './useDndSort';

export * from './dnd-sort.api';
export * from './dnd-sort-item.api';

const _DndSort = withInstall(DndSort);
const _DndSortItem = withInstall(DndSortItem);

export { _DndSortItem as DndSortItem, _DndSort as DndSort, useDndSortItem, useDndSort };
export default _DndSort;
