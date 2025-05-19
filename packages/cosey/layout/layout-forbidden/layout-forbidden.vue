<template>
  <el-result icon="warning" title="403" sub-title="对不起，您没有权限访问此页面。">
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
  name: 'LayoutForbidden',
});

const routerConfig = useGlobalConfig().router;
</script>
