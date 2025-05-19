export interface SnugMenuProps {
  mode?: 'horizontal' | 'vertical';
  modelValue?: string;
}

export interface SnugMenuSlots {
  default?: (props: Record<string, never>) => any;
}

export interface SnugMenuEmits {
  (e: 'change', name: string): void;
  (e: 'update:modelValue', name: string): void;
}

export interface SnugMenuContext {
  activeName?: string;
  select: (name: string) => void;
  mode: string;
}

export const snugMenuContextSymbol = Symbol('snugMenu');
