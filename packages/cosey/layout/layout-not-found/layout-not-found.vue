<template>
  <el-result icon="error" title="404" sub-title="对不起，您访问的页面不存在。">
    <template #extra>
      <router-link :to="routerConfig.homePath">
        <el-button type="primary">返回主页</el-button>
      </router-link>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useGlobalConfig } from '../../config';

defineOptions({
  name: 'LayoutNotFound',
});

const routerConfig = useGlobalConfig().router;
</script>
