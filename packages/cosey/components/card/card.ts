export interface CardProps {}

export interface CardSlots {
  default?: (props: Record<string, never>) => any;
}

export interface CardEmits {
  (e: 'click'): void;
}

export interface CardExpose {
  method: () => void;
}
