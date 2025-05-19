import { type TableActionItem } from './item';

export interface TableActionProps {
  actions?: TableActionItem[];
}

export const defaultTableActionProps = {
  actions: () => [],
};
