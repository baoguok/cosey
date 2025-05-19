<template>
  <div></div>
</template>

<script setup lang="ts">
import {
  type MediaViewerProps,
  type MediaViewerSlots,
  type MediaViewerEmits,
} from './media-viewer';

defineOptions({
  name: 'MediaViewer',
});

defineProps<MediaViewerProps>();

defineSlots<MediaViewerSlots>();

defineEmits<MediaViewerEmits>();
</script>
