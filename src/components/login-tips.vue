<template>
  <el-popover placement="top" :width="300" trigger="hover">
    <template #reference>
      <div>
        <el-button link size="large">{{ t('auth.viewLoginAccount') }}</el-button>
      </div>
    </template>

    <el-descriptions border size="small" :title="t('auth.administrator')">
      <el-descriptions-item :label="t('auth.account')">admin</el-descriptions-item>
      <el-descriptions-item :label="t('auth.password')">123456</el-descriptions-item>
    </el-descriptions>

    <el-descriptions border size="small" :title="t('auth.articleEditing')" class="mt-5">
      <el-descriptions-item :label="t('auth.account')">editor</el-descriptions-item>
      <el-descriptions-item :label="t('auth.password')">123456</el-descriptions-item>
    </el-descriptions>
  </el-popover>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
