import { type MediaCardBaseProps } from '../media-card/media-card.api';

export interface MediaCardGroupProps {
  srcset?: string | (MediaCardBaseProps | string)[];
  size?: MediaCardBaseProps['size'];
}

export interface MediaCardGroupSlots {
  default?: (props: Record<string, never>) => any;
}

export interface MediaCardGroupEmits {}

export interface MediaCardGroupExpose {}
