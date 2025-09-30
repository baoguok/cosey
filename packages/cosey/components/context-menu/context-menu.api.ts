import { type SlotsType, type ExtractPropTypes, type Ref } from 'vue';

export const contextMenuProps = {
  disabled: {
    type: Boolean,
  },
};

export type ContextMenuProps = ExtractPropTypes<typeof contextMenuProps>;

export interface ContextMenuSlots {
  default: {};
  reference: {};
}

export const contextMenuSlots = Object as SlotsType<ContextMenuSlots>;

export const contextMenuEmits = {
  command: (value: any) => value || true,
  open: () => true,
  close: () => true,
};

export type ContextMenuEmits = typeof contextMenuEmits;

export interface ContextMenuExpose {
  open: (x: number, y: number) => void;
  close: () => void;
}

export interface ContextMenuContext {
  withIcon: Ref<boolean>;
  addItem: (item: ContextMenuItemContext) => void;
  removeItem: (item: ContextMenuItemContext) => void;
  select: (command: any) => void;
  items: Ref<ContextMenuItemContext[]>;
}

export const contextMenuContextSymbol = Symbol('contextMenu');

export interface ContextMenuItemContext {
  show: () => void;
  hide: () => void;
  icon: boolean;
}
