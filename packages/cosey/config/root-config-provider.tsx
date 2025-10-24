import { computed, defineComponent, provide, reactive } from 'vue';
import { useColorSchemeProvide } from '../hooks';
import { getAlgorithm, rootConfigProviderProps } from './root-config-provider.api';
import { ConfigProvider, containerContextKey, useStackDialogProvide } from '../components';
import { useLayoutStore } from '../store';
import { useGlobalConfig } from './index';
import useNprogressStyle from './nprogress.style';

import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import { ElConfigProvider } from 'element-plus';
import { provideUploadConfig } from './upload';

export default defineComponent({
  name: 'CoRootConfigProvider',
  props: rootConfigProviderProps,
  setup(props, { slots }) {
    useNprogressStyle();

    // theme
    const { appliedColorScheme } = useColorSchemeProvide();

    const themeConfig = computed(() => {
      return {
        ...props.theme,
        algorithm: props.theme?.algorithm || getAlgorithm([...new Set([appliedColorScheme.value])]),
      };
    });

    const mergedConfigProviderProps = computed(() => {
      return {
        ...props,
        theme: themeConfig.value,
      };
    });

    // upload
    const apiConfig = useGlobalConfig()?.api;

    if (apiConfig) {
      const uploadApi = apiConfig.upload?.();
      provideUploadConfig({
        request: uploadApi,
      });
    }

    // container
    const layoutStore = useLayoutStore();

    provide(
      containerContextKey,
      reactive({
        height: computed(() => `calc(100vh - ${layoutStore.headerHeight}px)`),
      }),
    );

    // stack dialog
    useStackDialogProvide();

    return () => {
      return (
        <ConfigProvider {...mergedConfigProviderProps.value}>
          <ElConfigProvider locale={props.locale} v-slots={slots}></ElConfigProvider>
        </ConfigProvider>
      );
    };
  },
});
