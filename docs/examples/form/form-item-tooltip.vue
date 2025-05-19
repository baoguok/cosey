<template>
  <co-form-item
    v-model="state"
    label="field"
    placeholder="请输入"
    field-type="input"
    width="md"
    tooltip="提示信息"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const state = ref('');
</script>
