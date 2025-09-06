<template>
  <co-container>
    <co-card class="h-full">
      <co-form-item
        v-model="value"
        field-type="remoteselect"
        style="width: 200px"
        :field-props="{
          api: getUsers,
          props: { value: 'id', label: 'name' },
          formProps: { schemes: [{ prop: 'name' }] },
          immediate: true,
          optionProps: (option) => {
            return {
              value: option,
            };
          },
          valueKey: 'id',
        }"
      >
        <template #option="{ option }">
          <div class="flex items-center">
            <img style="width: 28px; height: 28px" :src="option.avatar" />
            <div class="ml-2">{{ option.name }}</div>
          </div>
        </template>
        <template #field-label="{ value }">
          <div class="flex items-center">
            <img style="width: 28px; height: 28px" :src="value.avatar" />
            <div class="ml-2">{{ value.name }}</div>
          </div>
        </template>
      </co-form-item>

      <co-remote-select
        v-model="value"
        :api="getUsers"
        :form-props="{ schemes: [{ prop: 'name' }] }"
        :props="{ value: 'id', label: 'name' }"
        value-key="id"
        immediate
        :optionProps="
          (option) => {
            return {
              value: option,
            };
          }
        "
        style="width: 200px"
        clearable
        @visible-change="console.log($event)"
      >
        <template #option="{ option }">
          <div class="flex items-center">
            <img style="width: 28px; height: 28px" :src="option.avatar" />
            <div class="ml-2">{{ option.name }}</div>
          </div>
        </template>
        <template #label="{ value }">
          <div class="flex items-center">
            <img style="width: 28px; height: 28px" :src="value.avatar" />
            <div class="ml-2">{{ value.name }}</div>
          </div>
        </template>
      </co-remote-select>

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
import { useUsersApi } from '@/api/users';
import { useUserStore } from 'cosey';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineOptions({
  name: 'Workspace',
});

const value = ref(1);

const userStore = useUserStore();

const { getUsers } = useUsersApi();
</script>
