export interface MediaViewerBaseProps {
  teleported?: boolean;
  zIndex?: number;
  closeOnPressEscape?: boolean;
  hideOnClickModal?: boolean;
  src?: string;
}

export interface MediaViewerProps extends MediaViewerBaseProps {}

export const defaultMediaViewerBaseProps = {
  closeOnPressEscape: true,
};

export const defaultMediaViewerProps = {
  ...defaultMediaViewerBaseProps,
};

export interface MediaViewerSlots {
  default?: (props: Record<string, never>) => any;
}

export interface MediaViewerBaseEmits {
  (e: 'close'): void;
}

export interface MediaViewerEmits extends MediaViewerBaseEmits {}
