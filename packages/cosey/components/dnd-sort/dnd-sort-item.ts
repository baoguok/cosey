export interface DndSortItemProps {
  index: number;
}

export interface DndSortItemSlots {
  prepend?: (props?: Record<string, any>) => any;
  default?: (props?: Record<string, any>) => any;
}
