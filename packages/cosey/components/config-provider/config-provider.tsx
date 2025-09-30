import { computed, defineComponent, onMounted, onUnmounted, provide, unref, watch } from 'vue';
import useMergeTheme from './useMergeTheme';
import {
  configProviderProps,
  useConfig,
  useConfigProvide,
  type ConfigProviderInnerProps,
} from './config-provider.api';
import { useThemeProvide } from '../theme';
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

    // config provider
    const configProvider: ConfigProviderInnerProps = {
      getPrefixCls,
      theme: mergedTheme,
      prefixCls: mergedPrefixCls,
      table: mergedTable,
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
    );

    // theme
    const themeManager = new ThemeManager(mergedTheme);

    onUnmounted(() => {
      themeManager.destroy();
    });

    useThemeProvide(themeManager);

    // override ElementPlus
    const { hashId } = useOverrideElementPlus(themeManager);

    onMounted(() => {
      if (!parentContext.theme) {
        document.documentElement.classList.add(hashId.value);
      }
    });

    return () => {
      return <div class={hashId.value}>{slots.default?.()}</div>;
    };
  },
});
