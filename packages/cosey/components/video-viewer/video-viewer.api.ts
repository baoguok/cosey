import { type SlotsType, type ExtractPropTypes } from 'vue';
import { mediaViewerBaseProps } from '../media-viewer/media-viewer.api';

export const videoViewerProps = {
  ...mediaViewerBaseProps,
};

export type VideoViewerProps = ExtractPropTypes<typeof videoViewerProps>;

export interface VideoViewerSlots {
  default: {};
}

export const videoViewerSlots = Object as SlotsType<VideoViewerSlots>;

export const videoViewerEmits = {
  close: () => true,
};

export type VideoViewerEmits = typeof videoViewerEmits;
