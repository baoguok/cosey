import { defaultMediaCardBaseProps, type MediaCardBaseProps } from '../media-card/media-card';
import { defaultAudioViewerProps, type AudioViewerProps } from '../audio-viewer/audio-viewer';

export interface AudioCardProps extends MediaCardBaseProps, AudioViewerProps {}

export const defaultAudioCardProps = {
  ...defaultAudioViewerProps,
  ...defaultMediaCardBaseProps,
};

export interface AudioCardEmits {
  (e: 'open'): void;
  (e: 'close'): void;
}

export interface AudioCardExpose {
  view: () => void;
}
