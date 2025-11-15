import { icons as co } from '@cosey/icons';

import type { IconifyJSON } from '@iconify/types';
import { ExtractPropTypes } from 'vue';

export const iconifyIconsSets: Record<string, any> = {
  co,
};

export const addIconifyIcon = (prefix: string, icons: IconifyJSON) => {
  iconifyIconsSets[prefix] = icons;
};

export const iconifyIconProps = {
  prefix: {
    type: String,
    default: 'co',
  },
  name: {
    type: String,
    required: true,
  },
};

export type IconifyIconProps = ExtractPropTypes<typeof iconifyIconProps>;
