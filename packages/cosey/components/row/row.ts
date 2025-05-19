export interface RowProps {
  tag?: string;
  gutter?: number;
  justify?: 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';
  align?: 'top' | 'middle' | 'bottom';
  breakpoints?: number[];
}

export const defaultRowProps = {
  tag: 'div',
  gutter: 0,
};

export interface RowSlots {
  default?: (props: Record<string, never>) => any;
}

export interface RowEmits {
  (e: 'size-change', size: RowSize): void;
}

export interface RowContext {
  gutter: number;
  currentSize: RowSize;
}

export const rowContextSymbol = Symbol('row');

export type RowSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const rowColumns = 24;

export const defaultBreakpoints = [576, 768, 992, 1200, 1600];
export const rowSizes: RowSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export const generateAlgorithms = (breakpoints: number[] = defaultBreakpoints) => {
  breakpoints = [0, ...breakpoints, Infinity];
  const algorithms: [RowSize, (size: number) => boolean][] = [];

  rowSizes.forEach((rowSize, i) => {
    algorithms.push([
      rowSize,
      (size: number) => size >= breakpoints[i] && size < breakpoints[i + 1],
    ]);
  });

  return algorithms;
};
