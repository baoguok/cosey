<template>
  <div v-if="type === 'audio'">
    <audio :src="body" />
  </div>
  <div v-else-if="type === 'video'">
    <video :src="body" />
  </div>
  <div v-else-if="type === 'image'">
    <img :src="body" />
  </div>
  <div v-else-if="type === 'file'">
    {{ body }}
  </div>
  <div v-else-if="type === 'json'">
    <Highlight :code="JSON.stringify(body, null, 2)" lang="json"></Highlight>
  </div>
  <div v-else-if="type === 'text'">
    {{ body }}
  </div>
</template>

<script lang="ts" setup>
import { type ContentType } from '@cosey/mock';
import { Highlight } from 'cosey/components';

defineOptions({
  name: 'HttpBodyPreview',
});

defineProps<{ type: ContentType; body: any }>();
</script>
