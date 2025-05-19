<template>
  <div :class="hashId">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import useMergeTheme from './useMergeTheme';
import {
  useConfig,
  useConfigProvide,
  type ConfigProviderInnerProps,
  type ConfigProviderProps,
} from './config-provider';
import { useThemeProvide } from '../theme';
import useOverrideElementPlus from './override-element-plus';

defineOptions({
  name: 'ConfigProvider',
});

const props = defineProps<ConfigProviderProps>();

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

// config provider
const configProvider: ConfigProviderInnerProps = {
  getPrefixCls,
  theme: mergedTheme,
  prefixCls: mergedPrefixCls,
};

useConfigProvide(configProvider);

// theme
useThemeProvide(mergedTheme);

// override ElementPlus
const { hashId } = useOverrideElementPlus('', mergedTheme);

onMounted(() => {
  if (!parentContext.theme) {
    document.documentElement.classList.add(hashId.value);
  }
});
</script>
