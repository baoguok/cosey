<template>
  <ConfigProvider v-bind="mergedConfigProviderProps">
    <ElConfigProvider :locale="locale">
      <slot></slot>
    </ElConfigProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { computed, provide, reactive } from 'vue';
import { useColorSchemeProvide } from '../hooks';
import { getAlgorithm, RootConfigProviderProps } from './root-config-provider';
import { ConfigProvider, containerContextKey, useUploadProvide } from '../components';
import { useLayoutStore } from '../store';
import { useGlobalConfig } from './index';
import useNprogressStyle from './nprogress.style';

import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

defineOptions({
  name: 'RootConfigProvider',
});

const props = defineProps<RootConfigProviderProps>();

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
  useUploadProvide({
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
</script>
