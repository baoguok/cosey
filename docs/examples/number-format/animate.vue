<template>
  <el-button class="me-4" @click="onClick">随机数</el-button>
  <co-number-format :value="value" animate />
</template>

<script lang="ts" setup>
import { random } from 'lodash-es';
import { ref } from 'vue';

const value = ref(random(1e3, 9e6));

const onClick = () => {
  value.value = random(1e3, 9e6);
};
</script>
