<template>
  <el-result icon="error" title="500" sub-title="对不起，服务器错误。">
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
  name: 'LayoutInternalServerError',
});

const routerConfig = useGlobalConfig().router;
</script>
