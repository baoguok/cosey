<template>
  <Button :active="isActive" @click="onClick">
    <Icon :name="props.icon" />
  </Button>
</template>

<script setup lang="ts">
import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button.vue';
import { type FormatAlign } from './custom-types';
import { useBlockValueActive } from './hooks/useBlockValueActive';

const props = defineProps<{
  icon: string;
  format: FormatAlign;
}>();

const editor = useEditor();

const isActive = useBlockValueActive('align', props.format);

const onClick = () => {
  editor.formatAlign(props.format);
};
</script>
