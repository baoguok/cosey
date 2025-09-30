import { type ExtractPropTypes, type SlotsType } from 'vue';

export const optionalWrapperProps = {
  when: {
    type: Boolean,
  },
  component: {
    type: Object,
  },
  props: {
    type: Object,
  },
};

export type OptionalWrapperProps = ExtractPropTypes<typeof optionalWrapperProps>;

export interface OptionalWrapperSlots {
  default: {};
}

export const optionalWrapperSlots = Object as SlotsType<OptionalWrapperSlots>;
