import { type ExtractPropTypes, type SlotsType } from 'vue';

export const contextMenuItemProps = {
  command: {},
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

export type ContextMenuItemProps = ExtractPropTypes<typeof contextMenuItemProps>;

export interface ContextMenuItemSlots {
  default: {};
}

export const contextMenuItemSlots = Object as SlotsType<ContextMenuItemSlots>;

export const contextMenuItemEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent,
};

export type ContextMenuItemEmits = typeof contextMenuItemEmits;
