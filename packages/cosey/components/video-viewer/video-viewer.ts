import {
  defaultMediaViewerBaseProps,
  type MediaViewerBaseProps,
} from '../media-viewer/media-viewer';

export interface VideoViewerProps extends MediaViewerBaseProps {}

export const defaultVideoViewerProps = {
  ...defaultMediaViewerBaseProps,
};

export interface VideoViewerSlots {
  default?: (props: Record<string, never>) => any;
}

export interface VideoViewerEmits {
  (e: 'close'): void;
}
