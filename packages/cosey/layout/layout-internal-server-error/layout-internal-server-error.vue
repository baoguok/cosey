<template>
  <el-result icon="error" title="500" :sub-title="t('co.exception.serverError')">
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
  name: 'CoLayoutInternalServerError',
});

const routerConfig = useGlobalConfig().router;
</script>
