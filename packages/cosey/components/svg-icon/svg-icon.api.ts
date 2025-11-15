import { type ExtractPropTypes } from 'vue';

export const svgIconProps = {
  name: {
    type: String,
  },
};

export type SvgIconProps = ExtractPropTypes<typeof svgIconProps>;
