import { type ExtractPropTypes, type PropType, type SlotsType } from 'vue';
import { isNumber } from '../../utils';

export const dndSortProps = {
  disabled: {
    type: Boolean,
  },
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap | (string & {})>,
  },
};

export type DndSortProps = ExtractPropTypes<typeof dndSortProps>;

export interface DndSortSlots {
  default: {};
}

export const dndSortSlots = Object as SlotsType<DndSortSlots>;

export const dndSortEmits = {
  move: (fromIndex: number, toIndex: number) => isNumber(fromIndex) && isNumber(toIndex),
};

export type DndSortEmits = typeof dndSortEmits;

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
