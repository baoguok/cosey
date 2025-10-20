import { type ExtractPropTypes, type PropType } from 'vue';
import { type TableActionItemProps } from './item.api';

type TableActionItemAtom =
  | TableActionItemProps
  | null
  | undefined
  | boolean
  | TableActionItemAtom[];

export const tableActionProps = {
  actions: {
    type: Array as PropType<TableActionItemAtom[] | TableActionItemAtom[][]>,
    default: () => [],
  },
};

export type TableActionProps = ExtractPropTypes<typeof tableActionProps>;

export interface TableActionConfig {
  itemProps?: TableActionItemProps;
}
