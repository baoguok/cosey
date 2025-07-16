<template>
  <Button @click="onClick">
    <Icon :name="icon" />
  </Button>
</template>

<script setup lang="ts">
import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button.vue';

const props = defineProps<{
  icon: string;
  delta: number;
}>();

const editor = useEditor();

const onClick = () => {
  editor.formatIndent(props.delta);
};
</script>
