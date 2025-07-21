<template>
  <co-container>
    <el-card shadow="never">
      <div class="flex">
        <el-avatar :size="80" class="flex-none" :src="userStore.userInfo?.avatar">
          <co-icon name="carbon:user" />
        </el-avatar>
        <div class="ms-4">
          <div class="text-lg font-bold">
            {{
              t('workspace.morningGreeting', {
                name: userStore.userInfo?.nickname,
              })
            }}
          </div>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="mt-4">
      <co-editor-v2></co-editor-v2>
    </el-card>
  </co-container>
</template>

<script lang="ts" setup>
import { useUserStore } from 'cosey';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineOptions({
  name: 'Workspace',
});

const userStore = useUserStore();
</script>
