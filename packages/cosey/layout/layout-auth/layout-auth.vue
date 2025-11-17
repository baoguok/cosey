<template>
  <div :class="[hashId, prefixCls]">
    <div :class="`${prefixCls}-bg`"></div>
    <div :class="`${prefixCls}-main`">
      <router-view></router-view>
    </div>

    <div :class="`${prefixCls}-brand`">
      <MergedLayoutBrand />
    </div>

    <div :class="`${prefixCls}-widget`">
      <component :is="AuthWidget" />
      <MergedLayoutLocale />
      <MergedLayoutColorScheme />
    </div>
  </div>
</template>

<script setup lang="ts">
import MergedLayoutColorScheme from '../merged/layout-color-scheme';
import MergedLayoutBrand from '../merged/layout-brand';
import MergedLayoutLocale from '../merged/layout-locale';
import useStyle from './style';
import { useComponentConfig } from '../../components';
import { defineTemplate } from '../../utils';
import { useGlobalConfig } from '../../config';

defineOptions({
  name: 'CoLayoutAuth',
});

const { prefixCls } = useComponentConfig('layout-auth');
const { hashId } = useStyle(prefixCls);

const slotsConfig = useGlobalConfig().slots;
const AuthWidget = defineTemplate(() => slotsConfig.authWidget?.());
</script>
