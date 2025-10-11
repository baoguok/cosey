<template>
  <ClientOnly>
    <RootConfigProvider>
      <CustomLayout />
    </RootConfigProvider>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { RootConfigProvider } from 'cosey';
import CustomLayout from './custom-layout.vue';
</script>
