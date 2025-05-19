import { defaultMediaCardBaseProps, type MediaCardBaseProps } from '../media-card/media-card';

import { defaultVideoViewerProps, type VideoViewerProps } from '../video-viewer/video-viewer';

export interface VideoCardProps extends MediaCardBaseProps, VideoViewerProps {}

export const defaultVideoCardProps = {
  ...defaultVideoViewerProps,
  ...defaultMediaCardBaseProps,
};

export interface VideoCardEmits {
  (e: 'open'): void;
  (e: 'close'): void;
}

export interface VideoCardExpose {
  view: () => void;
}
