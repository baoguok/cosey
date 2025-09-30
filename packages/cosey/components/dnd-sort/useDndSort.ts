import { computed, provide, reactive, Ref, ref, unref } from 'vue';
import { DndSortContext, dndSortContextSymbol, DndSortItemContext } from './dnd-sort.api';

export interface UseDndSortOptions {
  onMove?: (fromIndex: number, toIndex: number) => void;
  disabled?: boolean | Ref<boolean>;
}

export function useDndSort(options: UseDndSortOptions = {}) {
  const items = ref<DndSortItemContext[]>([]);

  const addItem = (item: DndSortItemContext) => {
    items.value.push(item);
  };

  const removeItem = (item: DndSortItemContext) => {
    items.value.splice(items.value.indexOf(item), 1);
  };

  const move = (fromIndex: number, toIndex: number) => {
    options.onMove?.(fromIndex, toIndex);
  };

  provide<DndSortContext>(
    dndSortContextSymbol,
    reactive({
      disabled: computed(() => unref(options.disabled)),
      items,
      addItem,
      removeItem,
      move,
    }),
  );
}
