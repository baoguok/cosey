<template>
  <ConfigProvider :theme="themeConfig">
    <CustomLayout />
  </ConfigProvider>
</template>

<script lang="ts" setup>
import {
  ConfigProvider,
  darkAlgorithm,
  defaultAlgorithm,
  useUploadProvide,
} from 'cosey/components';
import { computed } from 'vue';
import { useData } from 'vitepress';
import { upload } from '../../api/upload';
import CustomLayout from './custom-layout.vue';

const { isDark } = useData();

const themeConfig = computed(() => {
  return {
    algorithm: isDark.value ? darkAlgorithm : defaultAlgorithm,
  };
});

useUploadProvide({
  request: upload,
});
</script>
