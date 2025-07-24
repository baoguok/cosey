import { computed, type ComputedRef, inject, InjectionKey, provide } from 'vue';
import { type TableConfig } from '../table';
import { type ThemeConfig } from '../theme';
import { type Language } from '../../locale';

export interface ConfigProviderProps {
  prefixCls?: string;
  theme?: ThemeConfig;
  table?: TableConfig;
  locale?: Language;
}

export interface ConfigProviderInnerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  theme?: ComputedRef<ThemeConfig | undefined>;
  table: ComputedRef<TableConfig | undefined>;
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
