import { defaultMediaCardBaseProps, MediaCardBaseProps } from '../media-card/media-card';

export interface FileCardProps extends MediaCardBaseProps {}

export const defaultFileCardProps = {
  ...defaultMediaCardBaseProps,
};

export interface FileCardSlots {
  default?: (props: Record<string, never>) => any;
}
