import { type ExtractPropTypes } from 'vue';

export const contextMenuContentProps = {
  icon: {
    type: String,
  },
  withIcon: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  arrow: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  hover: {
    type: Boolean,
  },
};

export type ContextMenuContentProps = ExtractPropTypes<typeof contextMenuContentProps>;
