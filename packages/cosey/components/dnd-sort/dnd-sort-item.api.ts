import { type ExtractPropTypes, type SlotsType } from 'vue';

export const dndSortItemProps = {
  index: {
    type: Number,
    required: true,
  },
};

export type DndSortItemProps = ExtractPropTypes<typeof dndSortItemProps>;

export interface DndSortItemSlots {
  prepend: {};
  default: {};
}

export const dndSortItemSlots = Object as SlotsType<DndSortItemSlots>;
