import { type TableActionItem } from './item';

export interface TableActionProps {
  actions?: TableActionItem[] | TableActionItem[][];
}

export const defaultTableActionProps = {
  actions: () => [],
};
