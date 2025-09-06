import { type PaginationProps, selectProps } from 'element-plus';
import { type SlotsType, type PropType } from 'vue';
import { type TableConfig } from '../table/table';
import { type TableQueryProps } from '../table/table-query/table-query';
import { type Props } from '../../hooks';

export const remoteSelectProps = {
  ...selectProps,
  props: {
    type: Object as PropType<Props>,
  },
  optionProps: {
    type: Function as PropType<
      | Record<PropertyKey, any>
      | ((props: Record<PropertyKey, any>, index: number) => Record<PropertyKey, any>)
    >,
  },
  api: {
    type: Function as PropType<(...args: any[]) => Promise<any> | any>,
  },
  pagination: {
    type: [Object, Boolean] as PropType<boolean | PaginationProps>,
    default: true,
  },
  formProps: {
    type: Object as PropType<TableQueryProps>,
  },
  transformParams: {
    type: Function as PropType<(params: Record<string, any>) => any>,
  },
  keys: {
    type: Object as PropType<TableConfig['keys']>,
  },
  immediate: {
    type: Boolean,
    default: false,
  },
};

export type RemoteSelectProps = typeof remoteSelectProps;

export const remoteSelectSlots = {} as SlotsType<{
  default: {};
  header: {};
  footer: {};
  prefix: {};
  empty: {};
  tag: {};
  loading: {};
  label: {};
  option: { option: Record<PropertyKey, any>; index: number };
}>;

export type RemoteSelectSlots = typeof remoteSelectSlots;

export const remoteSelectEmits = {
  visibleChange: null as unknown as (visible: boolean) => void,
};

export type RemoteSelectEmits = typeof remoteSelectEmits;
