import { type SlotsType, type ExtractPropTypes } from 'vue';

export const contextSubMenuProps = {
  disabled: {
    type: Boolean,
  },
  divided: {
    type: Boolean,
  },
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
};

export type ContextSubMenuProps = ExtractPropTypes<typeof contextSubMenuProps>;

export interface ContextSubMenuSlots {
  default: {};
}

export const contextSubMenuSlots = Object as SlotsType<ContextSubMenuSlots>;
