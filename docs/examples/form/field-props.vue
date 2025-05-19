<template>
  <co-form-item
    v-model="username"
    label="用户名"
    field-type="input"
    :field-props="{
      maxlength: 10,
      showWordLimit: true,
      onInput(value) {
        console.log('input', value);
      },
    }"
    width="sm"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const username = ref('');
</script>
