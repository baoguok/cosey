import type { ExtractPropTypes, PropType, VNodeChild } from 'vue';

export interface TableStatisticsColumn {
  label: VNodeChild;
  prop: string;
  format?: (value: any) => any;
}

export const tableStatisticsProps = {
  columns: {
    type: Array as PropType<TableStatisticsColumn[]>,
    default: () => [],
  },
  data: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
};

export type TableStatisticsProps = ExtractPropTypes<typeof tableStatisticsProps>;
