import { type TransitionProps as VueTransitionProps } from 'vue';

export interface TransitionProps extends Omit<VueTransitionProps, 'name'> {
  name?: 'fade';
}

export interface TransitionSlots {
  default?: (props: Record<string, never>) => any;
}
