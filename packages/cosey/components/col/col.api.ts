import {
  type ExtractPropTypes,
  type ExtractPublicPropTypes,
  type PropType,
  type SlotsType,
} from 'vue';
import { rowColumns } from '../row';

export type ColSizeObject = {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
};

export type ColSize = number | ColSizeObject;

export const colProps = {
  tag: {
    type: String,
    default: 'div',
  },
  span: {
    type: Number,
    default: rowColumns,
  },
  offset: {
    type: Number,
    default: 0,
  },
  pull: {
    type: Number,
    default: 0,
  },
  push: {
    type: Number,
    default: 0,
  },
  xs: {
    type: [Number, Object] as PropType<ColSize>,
  },
  sm: {
    type: [Number, Object] as PropType<ColSize>,
  },
  md: {
    type: [Number, Object] as PropType<ColSize>,
  },
  lg: {
    type: [Number, Object] as PropType<ColSize>,
  },
  xl: {
    type: [Number, Object] as PropType<ColSize>,
  },
  xxl: {
    type: [Number, Object] as PropType<ColSize>,
  },
};

export type ColProps = ExtractPropTypes<typeof colProps>;
export type ColPublicProps = ExtractPublicPropTypes<typeof colProps>;

export interface ColSlots {
  default: {};
}

export const colSlots = Object as SlotsType<ColSlots>;
