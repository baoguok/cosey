import type { ExtractPropTypes, SlotsType } from 'vue';

export const panelProps = {
  maxHeight: {
    type: [String, Number],
  },
  header: {
    type: [String, Number],
  },
};

export type PanelProps = ExtractPropTypes<typeof panelProps>;

export interface PanelSlots {
  default?: {};
  header?: {};
}

export const panelSlots = {} as SlotsType<PanelSlots>;
