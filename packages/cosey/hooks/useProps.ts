import { get } from 'lodash-es';
import { computed, MaybeRef, unref } from 'vue';
import { isObject } from '../utils';

export interface Props {
  label?: string;
  value?: string;
  disabled?: string;
  options?: string;
}

export const defaultProps: Required<Props> = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  options: 'options',
};

export function useProps(props: MaybeRef<{ props?: Props; valueKey?: any }>) {
  const aliasProps = computed(() => ({ ...defaultProps, ...unref(props).props }));
  const valueKey = computed(() => unref(props).valueKey);

  const getLabel = (option: Record<PropertyKey, any>) => get(option, aliasProps.value.label);
  const getValue = (option: Record<PropertyKey, any>) => get(option, aliasProps.value.value);
  const getDisabled = (option: Record<PropertyKey, any>) => get(option, aliasProps.value.disabled);
  const getOptions = (option: Record<PropertyKey, any>) => get(option, aliasProps.value.options);
  const getKey = (value: any) =>
    isObject(value) && valueKey.value ? get(value, valueKey.value) : value;

  return {
    aliasProps,
    getLabel,
    getValue,
    getDisabled,
    getOptions,
    getKey,
  };
}
