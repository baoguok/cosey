<template>
  <pre :class="[hashId, prefixCls]"><code class="hljs" v-html="highlightedCode"></code></pre>
</template>

<script setup lang="ts">
import {
  type HighlightProps,
  type HighlightSlots,
  type HighlightEmits,
  type HighlightExpose,
  hljs,
} from './highlight';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';
import { computed } from 'vue';

defineOptions({
  name: 'Highlight',
});

const props = defineProps<HighlightProps>();

defineSlots<HighlightSlots>();

defineEmits<HighlightEmits>();

const { prefixCls } = useComponentConfig('highlight', props);

const { hashId } = useStyle(prefixCls);

const highlightedCode = computed(
  () =>
    hljs.highlight(props.code || '', {
      language: props.lang || 'txt',
    }).value,
);

defineExpose<HighlightExpose>();
</script>
