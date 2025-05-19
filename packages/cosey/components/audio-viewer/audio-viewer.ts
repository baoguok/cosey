import {
  defaultMediaViewerBaseProps,
  type MediaViewerBaseProps,
} from '../media-viewer/media-viewer';

export interface AudioViewerProps extends MediaViewerBaseProps {}

export const defaultAudioViewerProps = {
  ...defaultMediaViewerBaseProps,
};

export interface AudioViewerSlots {
  default?: (props: Record<string, never>) => any;
}

export interface AudioViewerEmits {
  (e: 'close'): void;
}
