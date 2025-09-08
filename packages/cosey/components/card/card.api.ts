import { type SlotsType, type ExtractPropTypes } from 'vue';

export const cardProps = {};

export type CardProps = ExtractPropTypes<typeof cardProps>;

export interface CardSlots {
  default: {};
}

export const cardSlots = Object as SlotsType<CardSlots>;

export const cardEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent,
};

export type CardEmits = typeof cardEmits;
