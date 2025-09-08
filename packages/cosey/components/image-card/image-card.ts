import { type ImageEmits, type ImageProps, imageProps as elImageProps } from 'element-plus';
import { mediaCardBaseProps, type MediaCardBaseProps } from '../media-card/media-card.api';

export interface ImageCardProps extends Omit<MediaCardBaseProps, 'src'>, ImageProps {}

export const imageProps = {
  ...elImageProps,
  fit: {
    ...elImageProps.fit,
    default: 'cover',
  },
  ...mediaCardBaseProps,
};

export interface ImageCardEmits extends ImageEmits {}

export interface ImageCardSlots {
  placeholder?: (props: Record<string, never>) => any;
  error?: (props: Record<string, never>) => any;
  viewer?: (props: Record<string, never>) => any;
}

export interface ImageCardExpose {
  view: () => void;
}
