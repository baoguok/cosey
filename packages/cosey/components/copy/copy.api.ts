import { type SlotsType, type ExtractPropTypes } from 'vue';

export const copyProps = {
  text: {
    type: String,
  },
  color: {
    type: String,
  },
};

export type CopyProps = ExtractPropTypes<typeof copyProps>;

export interface CopySlots {
  default: {};
}

export const copySlots = Object as SlotsType<CopySlots>;
