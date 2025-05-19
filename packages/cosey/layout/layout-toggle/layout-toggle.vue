<template>
  <el-button link @click.stop="toggle">
    <Icon
      :name="layoutStore.sidebarVisible ? 'co:side-panel-close' : 'co:side-panel-open'"
      size="xl"
    />
  </el-button>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useLayoutStore } from '../../store';
import { Icon } from '../../components';

defineOptions({
  name: 'LayoutToggle',
});

const layoutStore = useLayoutStore();

const toggle = () => {
  layoutStore.sidebarVisible = !layoutStore.sidebarVisible;
};
</script>
