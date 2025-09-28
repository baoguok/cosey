import type { ExtractPropTypes, PropType, SlotsType } from 'vue';

export const ribbonProps = {
  direction: {
    type: String as PropType<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>,
    default: 'top-right',
  },
  gap: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number,
    default: 150,
  },
  breadth: {
    type: Number,
    default: 0.5,
  },
  background: {
    type: String,
  },
  color: {
    type: String,
  },
};

export type RibbonProps = ExtractPropTypes<typeof ribbonProps>;

export interface RibbonSlots {
  default: {};
}

export const ribbonSlots = {} as SlotsType<RibbonSlots>;

export const ribbonEmits = {};

export type RibbonEmits = typeof ribbonEmits;

export interface RibbonExpose {}
