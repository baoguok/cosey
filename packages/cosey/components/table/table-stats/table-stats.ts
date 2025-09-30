import { VNodeChild } from 'vue';

export interface TableStatisticsColumn {
  label: VNodeChild;
  prop: string;
  format?: (value: unknown) => unknown;
}

export interface TableStatisticsProps {
  columns?: TableStatisticsColumn[];
  data?: Record<string, unknown>;
}

export const defaultTableStatsProps = {
  columns: () => [],
  data: () => ({}),
};
