<template>
  <template v-for="item in layoutStore.iframeTabList" :key="item.name">
    <Item v-if="shouldRender(item.name)" :name="item.name" :src="item.meta.iframeSrc!" />
  </template>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '../../store';
import Item from './item.vue';

defineOptions({
  name: 'CoLayoutIframe',
});

const layoutStore = useLayoutStore();

const shouldRender = (name: string) => {
  const keepAlive = layoutStore.keepAlive.includes(name);
  const isActive = name === layoutStore.activeTab;

  return isActive ? !layoutStore.refreshing : keepAlive;
};
</script>
