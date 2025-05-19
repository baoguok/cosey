<template>
  <co-form-item
    v-model="username"
    label="用户名"
    placeholder="请输入"
    field-type="input"
    width="md"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const username = ref('');
</script>
