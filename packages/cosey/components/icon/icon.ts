import { type IconifyIconProps } from '../iconify-icon';

export interface IconProps {
  name: IconifyIconProps['name'] | (string & {});
  size?: number | 'sm' | 'md' | 'lg' | 'xl' | ({} & string);
}
