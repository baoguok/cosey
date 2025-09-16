<template>
  <co-container>
    <co-card class="h-full">
      <div class="flex items-center gap-4">
        <co-upload single size="mini" />
        <co-upload single size="small" />
        <co-upload single size="middle" />
        <co-upload single size="large" />
      </div>
      <div>
        <co-form :model="model">
          <co-form-list v-model="model.list" v-slot="{ row, getProp }">
            <co-form-item v-model="row.name" :prop="getProp('name')" required label="名称" />
            <co-form-item v-model="row.age" :prop="getProp('age')" label="age" />
          </co-form-list>
        </co-form>
      </div>
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
    </co-card>
  </co-container>
</template>

<script lang="ts" setup>
import { useUserStore } from 'cosey';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineOptions({
  name: 'Workspace',
});

const userStore = useUserStore();

const model = reactive({
  list: [],
});
</script>
