<template>
  <div :class="[hashId, prefixCls]">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import useStyle from './style';
import { useComponentConfig } from '../../components';

defineOptions({
  name: 'LayoutException',
});

const { prefixCls } = useComponentConfig('layout-exception');

const { hashId } = useStyle(prefixCls);
</script>
