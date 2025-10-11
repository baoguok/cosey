import type { ExtractPropTypes, SlotsType } from 'vue';

export const longTextProps = {
  text: {
    type: String,
  },
  rows: {
    type: [String, Number],
    default: 3,
  },
  maxWidth: {
    type: [String, Number],
    default: 690,
  },
  maxHeight: {
    type: [String, Number],
    default: 320,
  },
};

export type LongTextProps = ExtractPropTypes<typeof longTextProps>;

export interface LongTextSlots {
  default: {};
}

export const longTextSlots = Object as SlotsType<LongTextSlots>;
