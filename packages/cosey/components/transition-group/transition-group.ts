import { type TransitionGroupProps as VueTransitionGroupProps } from 'vue';

export interface TransitionGroupProps extends VueTransitionGroupProps {
  effect?: 'slide' | 'flip' | 'fade' | (string & {});
}

export interface TransitionGroupSlots {
  default?: (props: Record<string, any>) => any;
}
