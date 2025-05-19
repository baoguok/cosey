export interface PanelProps {
  maxHeight?: string | number;
  header?: string | number;
}

export interface PanelSlots {
  default?: (props: Record<string, never>) => any;
  header?: (props: Record<string, never>) => any;
}
