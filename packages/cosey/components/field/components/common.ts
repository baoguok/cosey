import { type ExtractPropTypes } from 'vue';

export const fieldComponentCommonProps = {
  readonly: {
    type: Boolean,
  },
};
export type FieldComponentCommonProps = ExtractPropTypes<typeof fieldComponentCommonProps>;
