<template>
  <Button :active="isBlockActive" @click="onClick">
    <Icon :name="props.icon" />
  </Button>
</template>

<script setup lang="ts">
import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button.vue';
import { useBlockTypeActive } from './hooks/useBlockTypeActive';

const props = defineProps<{
  icon: string;
  format: string;
}>();

const editor = useEditor();

const isBlockActive = useBlockTypeActive(props.format);

const onClick = () => {
  editor.formatBlock(props.format);
};
</script>
