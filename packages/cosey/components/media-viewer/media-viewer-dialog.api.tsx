import { type ExtractPropTypes } from 'vue';

export const mediaViewerDialogProps = {
  teleported: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  hideOnClickModal: {
    type: Boolean,
  },
};

export type MediaViewerDialogProps = ExtractPropTypes<typeof mediaViewerDialogProps>;

export type MediaViewerDialogSlots = {
  default: {};
};

export const mediaViewerDialogEmits = {
  close: () => true,
};

export type MediaViewerDialogEmits = typeof mediaViewerDialogEmits;
