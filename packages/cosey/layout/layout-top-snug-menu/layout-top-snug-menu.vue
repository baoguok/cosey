<template>
  <SnugMenu v-model="layoutStore.topActive" mode="horizontal">
    <SnugMenuItem
      v-for="(item, i) in layoutStore.topMenus"
      :key="i"
      :name="item.name"
      :index="item.name"
      :icon="item.icon"
      :title="item.title"
      @click="onClick(item)"
    />
  </SnugMenu>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { type MenuItem } from '../../router';
import { useLayoutStore } from '../../store';
import { SnugMenu, SnugMenuItem } from '../../components';

defineOptions({
  name: 'LayoutTopSnugMenu',
});

const layoutStore = useLayoutStore();

const router = useRouter();

const onClick = (item: MenuItem) => {
  if (item._externalLink) {
    window.open(item.path, '_blank');
  } else {
    layoutStore.topActive = item.name;

    if (!item.children || item.children.length === 0) {
      router.push({
        name: item.name,
      });
    }
  }
};
</script>
