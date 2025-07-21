<template>
  <el-result icon="warning" title="403" :sub-title="t('co.exception.noPermission')">
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
  name: 'LayoutForbidden',
});

const routerConfig = useGlobalConfig().router;
</script>
