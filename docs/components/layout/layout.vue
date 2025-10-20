<template>
  <ClientOnly>
    <RootConfigProvider :locale="coseyZhCn">
      <CustomLayout />
    </RootConfigProvider>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { RootConfigProvider } from 'cosey';
import coseyZhCn from 'cosey/locale/lang/zh-cn';

import CustomLayout from './custom-layout.vue';
</script>
