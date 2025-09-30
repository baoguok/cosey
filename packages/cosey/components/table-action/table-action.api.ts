import { type ExtractPropTypes, type PropType } from 'vue';
import { type TableActionItem } from './item.api';

type TableActionItemAtom = TableActionItem | null | undefined;

export const tableActionProps = {
  actions: {
    type: Array as PropType<TableActionItemAtom[] | TableActionItemAtom[][]>,
    default: () => [],
  },
};

export type TableActionProps = ExtractPropTypes<typeof tableActionProps>;
