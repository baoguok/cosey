import { icons as co } from '@cosey/icons';

import type { IconifyJSON } from '@iconify/types';

export const iconifyIconsSets: Record<string, any> = {
  co,
};

export const addIconifyIcon = (prefix: string, icons: IconifyJSON) => {
  iconifyIconsSets[prefix] = icons;
};

export interface IconifyIconProps {
  prefix: string;
  name: string;
}
