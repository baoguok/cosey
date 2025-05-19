export interface LongTextProps {
  text?: string;
  rows?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
}

export const defaultLongTextProps = {
  rows: 3,
  maxHeight: 320,
  maxWidth: 690,
};

export interface LongTextSlots {
  default?: (props: Record<string, never>) => any;
}
