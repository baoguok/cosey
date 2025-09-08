import { type ExtractPropTypes } from 'vue';

export const mediaViewerBaseProps = {
  teleported: {
    type: Boolean,
  },
  zIndex: {
    type: Number,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  hideOnClickModal: {
    type: Boolean,
  },
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
  close: () => true,
};

export type MediaViewerBaseEmits = typeof mediaViewerBaseEmits;

export const mediaViewerEmits = {
  ...mediaViewerBaseEmits,
};

export type MediaViewerEmits = typeof mediaViewerEmits;
