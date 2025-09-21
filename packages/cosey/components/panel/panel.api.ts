import type { SlotsType } from 'vue';

export interface PanelProps {
  maxHeight?: string | number;
  header?: string | number;
}

export const panelProps = {
  maxHeight: {
    type: [String, Number],
  },
  header: {
    type: [String, Number],
  },
};

export interface PanelSlots {
  default?: {};
  header?: {};
}

export const panelSlots = {} as SlotsType<PanelSlots>;
