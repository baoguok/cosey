import { computed, defineComponent, onUnmounted, provide, unref, watch } from 'vue';
import useMergeTheme from './useMergeTheme';
import {
  configProviderProps,
  useConfig,
  useConfigProvide,
  type ConfigProviderInnerProps,
} from './config-provider.api';
import { useThemeProvide, useToken } from '../theme';
import useOverrideElementPlus from './override-element-plus';
import { ThemeManager } from '../theme/theme-context';
import { localeContextKey, outsideLocale } from '../../hooks';
import { en } from '../../locale';

export default defineComponent({
  name: 'CoConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    const parentContext = useConfig();

    const mergedPrefixCls = computed(() => props.prefixCls || parentContext.prefixCls.value);

    const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? `${mergedPrefixCls.value}-${suffixCls}` : mergedPrefixCls.value;
    };

    const mergedTheme = useMergeTheme(
      computed(() => props.theme),
      computed(() => parentContext.theme?.value),
    );

    const mergedTable = computed(() => {
      return props.table || unref(parentContext.table);
    });

    const mergedTableAction = computed(() => {
      return props.tableAction || unref(parentContext.tableAction);
    });

    // config provider
    const configProvider: ConfigProviderInnerProps = {
      getPrefixCls,
      theme: mergedTheme,
      prefixCls: mergedPrefixCls,
      table: mergedTable,
      tableAction: mergedTableAction,
    };

    useConfigProvide(configProvider);

    // locale
    provide(
      localeContextKey,
      computed(() => props.locale),
    );

    watch(
      () => props.locale,
      () => {
        outsideLocale.value = props.locale || en;
      },
      {
        immediate: true,
      },
    );

    // theme
    const themeManager = new ThemeManager(mergedTheme);

    onUnmounted(() => {
      themeManager.destroy();
    });

    useThemeProvide(themeManager);

    // override ElementPlus
    useOverrideElementPlus(themeManager);

    // root hash
    const { hashId } = useToken(themeManager);

    watch(
      hashId,
      (newHashId, oldHashId) => {
        if (!parentContext.theme) {
          if (oldHashId) {
            document.documentElement.classList.remove(oldHashId);
          }
          document.documentElement.classList.add(newHashId);
        }
      },
      {
        immediate: true,
      },
    );

    return () => {
      return <div class={hashId.value}>{slots.default?.()}</div>;
    };
  },
});
