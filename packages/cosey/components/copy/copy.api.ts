import { ButtonProps } from 'element-plus';
import { type SlotsType, type ExtractPropTypes, PropType } from 'vue';

export const copyProps = {
  text: {
    type: String,
  },
  color: {
    type: String,
  },
  type: {
    type: String as PropType<ButtonProps['type']>,
    default: '',
  },
};

export type CopyProps = ExtractPropTypes<typeof copyProps>;

export interface CopySlots {
  default: {};
}

export const copySlots = Object as SlotsType<CopySlots>;
