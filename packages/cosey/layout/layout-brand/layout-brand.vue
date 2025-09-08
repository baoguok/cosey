<template>
  <div
    :class="[
      hashId,
      prefixCls,
      {
        'is-horizontal': isHorizontal,
      },
    ]"
  >
    <img v-if="!hideLogo" :src="siteConfig.logo" :class="`${prefixCls}-logo`" />
    <span v-if="!hideName" :class="`${prefixCls}-name`">
      {{ siteConfig.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useGlobalConfig } from '../../config';
import useStyle from './style';
import { useComponentConfig } from '../../components';

defineOptions({
  name: 'CoLayoutBrand',
});

defineProps<{
  hideName?: boolean;
  hideLogo?: boolean;
  isHorizontal?: boolean;
}>();

const { prefixCls } = useComponentConfig('layout-brand');

const { hashId } = useStyle(prefixCls);

const siteConfig = useGlobalConfig().site;
</script>
