import { SlotsType, type ExtractPropTypes, type PropType } from 'vue';

export const transitionProps = {
  name: {
    type: String,
    default: 'fade',
  },
  css: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String as PropType<'transition' | 'animation'>,
  },
  duration: {
    type: [Number, Object] as PropType<number | { enter: number; leave: number }>,
  },
  mode: {
    type: String as PropType<'in-out' | 'out-in' | 'default'>,
  },
  appear: {
    type: Boolean,
  },
  enterFromClass: {
    type: String,
  },
  enterActiveClass: {
    type: String,
  },
  enterToClass: {
    type: String,
  },
  appearFromClass: {
    type: String,
  },
  appearActiveClass: {
    type: String,
  },
  appearToClass: {
    type: String,
  },
  leaveFromClass: {
    type: String,
  },
  leaveActiveClass: {
    type: String,
  },
  leaveToClass: {
    type: String,
  },
};

export type TransitionProps = ExtractPropTypes<typeof transitionProps>;

export interface TransitionSlots {
  default: {};
}

export const transitionSlots = Object as SlotsType<TransitionSlots>;
