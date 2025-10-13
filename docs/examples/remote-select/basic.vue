<template>
  <co-remote-select
    v-model="value"
    :api="getUsers"
    :props="{ label: 'name', value: 'id' }"
    :form-props="{ schemes: [{ prop: 'name', label: '姓名', width: 'xs' }] }"
    @change="console.log($event)"
  >
    <template #option="{ option }">
      <div class="flex items-center">
        <img style="width: 28px; height: 28px; object-fit: contain" :src="option.avatar" />
        <div class="ml-2">{{ option.name }}</div>
      </div>
    </template>
  </co-remote-select>
</template>

<script lang="ts" setup>
import { useUsersApi } from '@/api/users';
import { ref } from 'vue';

const { getUsers } = useUsersApi();

const value = ref();
</script>
