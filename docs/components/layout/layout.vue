<template>
  <ConfigProvider :theme="themeConfig">
    <Layout />
  </ConfigProvider>
</template>

<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme';
import {
  ConfigProvider,
  darkAlgorithm,
  defaultAlgorithm,
  useUploadProvide,
} from 'cosey/components';
import { useOverrideVitePress } from './override-vite-press';
import { computed } from 'vue';
import { useData } from 'vitepress';
import { upload } from '../../api/upload';

const { Layout } = DefaultTheme;

const { isDark } = useData();

const themeConfig = computed(() => {
  return {
    algorithm: isDark.value ? darkAlgorithm : defaultAlgorithm,
  };
});

useUploadProvide({
  request: upload,
});

useOverrideVitePress(themeConfig);
</script>
