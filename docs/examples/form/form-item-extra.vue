<template>
  <co-form-item v-model="state" label="用户名" placeholder="请输入" width="md">
    <template #extra>
      <div>规范：</div>
      <div>1. 不能包括空格</div>
      <div>2. 长度为8-16个字符</div>
      <div>3. 只能包含字母、数字和下划线</div>
    </template>
  </co-form-item>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const state = ref('');
</script>
