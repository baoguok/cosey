<template>
  <RootConfigProvider>
    <CustomLayout />
  </RootConfigProvider>
</template>

<script lang="ts" setup>
import { RootConfigProvider } from 'cosey';
import CustomLayout from './custom-layout.vue';
</script>
