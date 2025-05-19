<template>
  <co-upload v-model="value" action="/upload" select-only @change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref<string[]>([]);

const onChange = () => {
  console.log(value.value);
};
</script>
