export interface DndSortProps {
  disabled?: boolean;
  tag?: keyof HTMLElementTagNameMap | (string & {});
}

export interface DndSortSlots {
  default?: (props?: Record<string, any>) => any;
}

export interface DndSortEmits {
  (e: 'move', fromIndex: number, toIndex: number): void;
}

export interface DndSortItemContext {
  offsetY: number;
  index: number;
  el?: HTMLElement | null;
  squeezed?: boolean;
  rect?: DOMRect;
}

export interface DndSortContext {
  disabled?: boolean;
  items: DndSortItemContext[];
  addItem: (item: DndSortItemContext) => void;
  removeItem: (item: DndSortItemContext) => void;
  move: (fromIndex: number, toIndex: number) => void;
}

export const dndSortContextSymbol = Symbol('dndSort');
