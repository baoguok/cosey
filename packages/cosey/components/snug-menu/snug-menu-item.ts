export interface SnugMenuItemProps {
  name: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}

export interface SnugMenuItemSlots {
  default?: (props: Record<string, never>) => any;
}

export interface SnugMenuItemEmits {
  (e: 'click', event: MouseEvent): void;
}
