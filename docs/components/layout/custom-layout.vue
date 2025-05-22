<template>
  <Layout />
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { useOverrideVitePress } from './override-vite-press';

const { Layout } = DefaultTheme;

useOverrideVitePress();
</script>
