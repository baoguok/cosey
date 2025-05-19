import { type Ref } from 'vue';

export interface ContextMenuProps {
  disabled?: boolean;
}

export interface ContextMenuSlots {
  default?: (props: Record<string, never>) => any;
  reference?: (props: Record<string, never>) => any;
}

export interface ContextMenuEmits {
  (e: 'command', value: any): void;
  (e: 'open'): void;
  (e: 'close'): void;
}

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
