import { buttonProps as elButtonProps, popconfirmProps } from 'element-plus';
import { PropType, type ExtractPropTypes } from 'vue';

export const tableActionItemProps = {
  ...elButtonProps,
  link: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'>,
    default: 'primary',
  },
  label: {
    type: String,
  },
  popconfirm: {
    type: Object as PropType<
      Partial<ExtractPropTypes<typeof popconfirmProps>> & {
        confirm?: (event: MouseEvent) => any;
        cancel?: (event: MouseEvent) => void;
      }
    >,
  },
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
  },
};

export type TableActionItem = Partial<ExtractPropTypes<typeof tableActionItemProps>>;
