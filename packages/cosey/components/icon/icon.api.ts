import { type ExtractPropTypes, type PropType } from 'vue';
import { type IconifyIconProps } from '../iconify-icon';

export const iconProps = {
  name: {
    type: String as PropType<IconifyIconProps['name'] | (string & {})>,
  },
  size: {
    type: [Number, String] as PropType<number | 'sm' | 'md' | 'lg' | 'xl' | ({} & string)>,
  },
};

export type IconProps = ExtractPropTypes<typeof iconProps>;
