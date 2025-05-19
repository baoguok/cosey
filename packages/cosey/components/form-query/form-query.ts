import { ExtractPropTypes, type PropType } from 'vue';
import { type FormSlots, type FormEmits, type FormExpose, formProps } from '../form/form';
import { type ColProps } from '../col';

export const defaultMapSizeColNumber = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 6,
  xxl: 6,
};

export const formQueryProps = {
  ...formProps,
  grid: {
    type: Boolean,
    default: true,
  },
  colProps: {
    type: Object as PropType<ColProps>,
    default: () => defaultMapSizeColNumber,
  },
  minFields: {
    type: Number,
    default: -1,
  },
  collapsed: {
    type: Boolean,
    default: true,
  },
};

export type FormQueryProps = Partial<ExtractPropTypes<typeof formQueryProps>>;

export interface FormQuerySlots extends FormSlots {}

export interface FormQueryEmits extends /* @vue-ignore */ FormEmits {
  (e: 'update:collapsed', val: boolean): void;
}

export interface FormQueryExpose extends FormExpose {}

export interface FormQueryContext {
  shouldHide: (index: number) => boolean;
}

export const formQueryContextSymbol = Symbol('formQueryContext');
