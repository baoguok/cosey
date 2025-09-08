import { type ExtractPropTypes, type PropType } from 'vue';
import { type TableActionItem } from './item.api';

export const tableActionProps = {
  actions: {
    type: Array as PropType<TableActionItem[] | TableActionItem[][]>,
    default: () => [],
  },
};

export type TableActionProps = ExtractPropTypes<typeof tableActionProps>;
