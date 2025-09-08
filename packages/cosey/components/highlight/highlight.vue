<template>
  <div :class="[hashId, prefixCls]">
    <pre><code class="hljs" v-html="highlightedCode"></code></pre>
    <div :class="`${prefixCls}-copy`">
      <Copy :text="code" :class="`${prefixCls}-copy`" />
    </div>
  </div>
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
import Copy from '../copy/copy';

defineOptions({
  name: 'CoHighlight',
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
