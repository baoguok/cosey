import type { ExtractPropTypes, PropType, SlotsType } from 'vue';

export const descriptionsProps = {
  data: {
    type: Array as PropType<any[][]>,
    default: () => [],
  },
  labelAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'right',
  },
  border: {
    type: Boolean,
    default: false,
  },
  colon: {
    type: Boolean,
    default: true,
  },
};

export type DescriptionsProps = ExtractPropTypes<typeof descriptionsProps>;

export interface DescriptionsSlots {
  default: {};
}

export const descriptionsSlots = {} as SlotsType<DescriptionsSlots>;

export const descriptionsEmits = {};

export type DescriptionsEmits = typeof descriptionsEmits;

export interface DescriptionsExpose {}
