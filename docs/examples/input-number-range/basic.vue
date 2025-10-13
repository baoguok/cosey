<template>
  <co-input-number-range v-model="value" start-placeholder="最小值" end-placeholder="最大值" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref();
</script>
