export interface ContextSubMenuProps {
  disabled?: boolean;
  divided?: boolean;
  icon?: string;
  title?: string;
}

export interface ContextSubMenuSlots {
  default?: (props: Record<string, never>) => any;
}

export interface ContextSubMenuEmits {}

export interface ContextSubMenuExpose {}
