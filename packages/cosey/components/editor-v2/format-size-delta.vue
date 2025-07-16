<template>
  <Button @click="onClick">
    <Icon :name="icon" />
  </Button>
</template>

<script setup lang="ts">
import { useEditor } from 'slate-vue3';
import Button from './button.vue';
import Icon from '../icon/icon.vue';

const props = defineProps<{
  icon: string;
  delta: number;
}>();

const emit = defineEmits<{
  (e: 'change', size: string): void;
}>();

const editor = useEditor();

const onClick = () => {
  editor.formatSizeDelta(props.delta, (numSize) => {
    emit('change', numSize + 'px');
  });
};
</script>
