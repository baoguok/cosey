import { type CSSProperties } from 'vue';

export interface ScrollViewProps {
  innerStyle?: CSSProperties;
}

export interface ScrollViewSlots {
  default?: (props: Record<string, never>) => any;
}
