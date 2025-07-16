<template>
  <Button :active="isMarkActive" @click="onClick">
    <Icon :name="icon" />
  </Button>
</template>

<script setup lang="ts">
import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button.vue';
import { useMarkActive } from './hooks/useMarkActive';

const props = defineProps<{
  icon: string;
  format: string;
}>();

const editor = useEditor();

const isMarkActive = useMarkActive(props.format);

const onClick = () => {
  editor.formatMark(props.format);
};
</script>
