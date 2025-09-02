import { type SpaceProps } from 'element-plus';

export interface FormGroupProps extends Partial<Omit<SpaceProps, 'class' | 'style'>> {
  title?: string;
  borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted';
  position?: 'left' | 'right' | 'center';
  collapsible?: boolean;
  collapsed?: boolean;
}

export interface FormGroupSlots {
  default?: (props: Record<string, any>) => any;
}

export interface FormGroupEmits {
  (e: 'update:collapsed', collapsed: boolean): void;
}
