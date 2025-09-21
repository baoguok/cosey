import type { ExtractPropTypes, PropType, SlotsType } from 'vue';

export const numberFormatProps = {
  value: {
    type: [Number, String],
  },
  precision: {
    type: Number,
    default: 0,
  },
  animate: {
    type: Boolean,
  },
  duration: {
    type: Number,
    default: 1500,
  },
  locales: {
    type: String as PropType<'zh-Hans' | 'en-US' | (string & {})>,
    default: 'zh-Hans',
  },
  type: {
    type: String as PropType<'currency' | 'decimal' | 'percent'>,
    default: 'decimal',
  },
  currency: {
    type: String as PropType<'CNY' | 'USD' | (string & {})>,
    default: 'CNY',
  },
  beforeDisplay: {
    type: Function as PropType<(value: string) => string>,
  },
};

export type NumberFormatProps = ExtractPropTypes<typeof numberFormatProps>;

export interface NumberFormatSlots {
  default: {};
}

export const numberFormatSlots = {} as SlotsType<NumberFormatSlots>;

export interface NumberFormatEmits {}

export interface NumberFormatExpose {}
