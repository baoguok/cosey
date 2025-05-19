import { rowColumns } from '../row';

export type ColSizeObject = {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
};

export type ColSize = number | ColSizeObject;

export interface ColProps {
  tag?: string;
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
  xs?: ColSize;
  sm?: ColSize;
  md?: ColSize;
  lg?: ColSize;
  xl?: ColSize;
  xxl?: ColSize;
}

export const defaultColProps = {
  tag: 'div',
  span: rowColumns,
  offset: 0,
  pull: 0,
  push: 0,
};

export interface ColSlots {
  default?: (props: Record<string, never>) => any;
}
