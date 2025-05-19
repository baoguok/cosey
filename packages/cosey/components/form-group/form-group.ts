import { type DividerProps, type SpaceProps } from 'element-plus';

export interface FormGroupProps extends Partial<SpaceProps>, Partial<DividerProps> {
  title?: string;
  collapsible?: boolean;
  collapsed?: boolean;
}

export interface FormGroupSlots {
  default?: (props: Record<string, any>) => any;
}

export interface FormGroupEmits {
  (e: 'update:collapsed', collapsed: boolean): void;
}
