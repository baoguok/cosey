<template>
  <component ref="row" :is="tag" :class="[hashId, prefixCls]" :style="rowStyle">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { useResizeObserver } from '../../hooks';
import {
  type RowSlots,
  type RowProps,
  type RowEmits,
  type RowContext,
  type RowSize,
  defaultRowProps,
  rowContextSymbol,
  generateAlgorithms,
} from './row';
import {
  computed,
  provide,
  reactive,
  ref,
  toRef,
  useTemplateRef,
  watch,
  type CSSProperties,
} from 'vue';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'Row',
});

const props = withDefaults(defineProps<RowProps>(), defaultRowProps);

defineSlots<RowSlots>();

const emit = defineEmits<RowEmits>();

const { prefixCls } = useComponentConfig('row', props);

const { hashId } = useStyle(prefixCls);

const currentSize = ref<RowSize>('xs');

const algorithms = computed(() => generateAlgorithms(props.breakpoints));

const rowRef = useTemplateRef('row');

useResizeObserver(rowRef, ({ inlineSize }) => {
  for (const [size, algorithm] of algorithms.value) {
    if (algorithm(inlineSize)) {
      currentSize.value = size;
      return;
    }
  }
});

watch(currentSize, () => {
  emit('size-change', currentSize.value);
});

const rowStyle = computed(() => {
  const styles: CSSProperties = {
    justifyContent: props.justify,
    alignItems: props.align,
  };
  if (!props.gutter) {
    return styles;
  }

  styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
  return styles;
});

provide<RowContext>(
  rowContextSymbol,
  reactive({
    gutter: toRef(() => props.gutter),
    currentSize,
  }),
);
</script>
