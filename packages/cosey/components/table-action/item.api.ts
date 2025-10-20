import { type ButtonProps, popconfirmProps } from 'element-plus';
import { type PropType, type ExtractPropTypes } from 'vue';

export interface TableActionItemProps extends Partial<ButtonProps> {
  label?: string;
  popconfirm?: Partial<ExtractPropTypes<typeof popconfirmProps>> & {
    confirm?: (event: MouseEvent) => any;
    cancel?: (event: MouseEvent) => void;
  };
  onClick?: (event: MouseEvent) => void;
  hidden?: boolean;
  visible?: boolean;
  icon?: string;
}

export const defaultTableActionItemProps: TableActionItemProps = {
  link: true,
  type: 'primary',
  hidden: false,
  visible: true,
};

export const tableActionItemProps = {
  props: {
    type: Object as PropType<TableActionItemProps>,
  },
};
