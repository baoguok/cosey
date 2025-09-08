<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="item in routes" :key="item.name">
      <template
        v-if="route.name === item.route.name || (item.children && item.children.length > 0)"
      >
        {{ t(item.route.meta?.title ?? '') }}
      </template>
      <router-link v-else :to="{ name: String(item.route.name) }">
        {{ t(item.route.meta?.title ?? '') }}
      </router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { type MenuNode, getBreadcrumbRoutes } from '../../router';
import { useLayoutStore } from '../../store';
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'CoLayoutBreadcrumb',
});

const { t } = useI18n();

const layoutStore = useLayoutStore();

const route = useRoute();

const routes = ref<MenuNode[]>([]);

watch(
  () => route.name,
  () => {
    const node = layoutStore.menusMap[route.name as string];
    if (node) {
      routes.value = getBreadcrumbRoutes(node);
    }
  },
  {
    immediate: true,
  },
);
</script>
