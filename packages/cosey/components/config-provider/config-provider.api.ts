import {
  type ComputedRef,
  type ExtractPropTypes,
  type PropType,
  computed,
  inject,
  InjectionKey,
  provide,
} from 'vue';
import { type TableConfig } from '../table';
import { type ThemeConfig } from '../theme';
import { type Language } from '../../locale';
import { type TableActionConfig } from '../table-action';

export const configProviderProps = {
  prefixCls: {
    type: String,
  },
  theme: {
    type: Object as PropType<ThemeConfig>,
  },
  table: {
    type: Object as PropType<TableConfig>,
  },
  tableAction: {
    type: Object as PropType<TableActionConfig>,
  },
  locale: {
    type: Object as PropType<Language>,
  },
};

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;

export interface ConfigProviderInnerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  theme?: ComputedRef<ThemeConfig | undefined>;
  table: ComputedRef<TableConfig | undefined>;
  tableAction: ComputedRef<TableActionConfig | undefined>;
  prefixCls: ComputedRef<string>;
}

const configProviderKey = Symbol('configProvider') as InjectionKey<ConfigProviderInnerProps>;

export const defaultPrefixCls = 'co';

export const defaultConfigProvider: ConfigProviderInnerProps = {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
  },
  prefixCls: computed(() => defaultPrefixCls),
  table: computed(() => void 0),
  tableAction: computed(() => void 0),
};

export const useConfigProvide = (props: ConfigProviderInnerProps) => {
  return provide(configProviderKey, props);
};

export const useConfig = () => {
  return inject(configProviderKey, defaultConfigProvider);
};

export const useComponentConfig = (name: string, props?: Record<string, any>) => {
  const configContext = useConfig();

  const prefixCls = computed(() => {
    return configContext.getPrefixCls(name, props?.prefixCls);
  });

  return {
    prefixCls,
  };
};
