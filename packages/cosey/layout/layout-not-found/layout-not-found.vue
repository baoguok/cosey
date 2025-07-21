<template>
  <el-result icon="error" title="404" :sub-title="t('co.exception.pageNotFound')">
    <template #extra>
      <router-link :to="routerConfig.homePath">
        <el-button type="primary">{{ t('co.exception.backToHome') }}</el-button>
      </router-link>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useGlobalConfig } from '../../config';
import { useLocale } from '../../hooks';

const { t } = useLocale();

defineOptions({
  name: 'LayoutNotFound',
});

const routerConfig = useGlobalConfig().router;
</script>
