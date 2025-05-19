export interface ContextMenuItemProps {
  command?: any;
  disabled?: boolean;
  divided?: boolean;
  icon?: string;
  title?: string;
}

export interface ContextMenuItemSlots {
  default?: (props: Record<string, never>) => any;
}

export interface ContextMenuItemEmits {
  (e: 'click', event: MouseEvent): void;
}

export interface ContextMenuItemExpose {}
