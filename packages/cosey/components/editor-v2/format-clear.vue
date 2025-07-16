<template>
  <Button @click="onClick">
    <Icon name="co:text-clear-format" />
  </Button>
</template>

<script setup lang="ts">
import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button.vue';

const editor = useEditor();

const onClick = () => {
  editor.clearForamts();
};
</script>
