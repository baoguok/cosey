import { type ExtractPropTypes } from 'vue';
import { mediaViewerDialogEmits, mediaViewerDialogProps } from './media-viewer-dialog.api';

export const mediaViewerBaseProps = {
  ...mediaViewerDialogProps,
  src: {
    type: String,
  },
};

export type MediaViewerBaseProps = ExtractPropTypes<typeof mediaViewerBaseProps>;

export const mediaViewerProps = mediaViewerBaseProps;

export type MediaViewerProps = ExtractPropTypes<typeof mediaViewerProps>;

export type MediaViewerSlots = {
  default: {};
};

export const mediaViewerBaseEmits = {
  ...mediaViewerDialogEmits,
};

export type MediaViewerBaseEmits = typeof mediaViewerBaseEmits;

export const mediaViewerEmits = {
  ...mediaViewerBaseEmits,
};

export type MediaViewerEmits = typeof mediaViewerEmits;
