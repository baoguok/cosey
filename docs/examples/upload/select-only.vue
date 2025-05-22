<template>
  <co-upload v-model="value" select-only @change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref<File[]>([]);

const onChange = () => {
  console.log(value.value);
};
</script>
