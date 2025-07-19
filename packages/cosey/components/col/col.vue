<template>
  <component :is="tag" :class="colClass" :style="colStyle">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, inject } from 'vue';
import { defaultColProps, type ColSlots, type ColProps, type ColSize } from './col';
import { type RowContext, type RowSize, rowContextSymbol, rowSizes } from '../row';
import { isNumber, isObject } from '../../utils';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'Col',
});

const props = withDefaults(defineProps<ColProps>(), defaultColProps);

defineSlots<ColSlots>();

const { prefixCls } = useComponentConfig('col', props);

const { hashId } = useStyle(prefixCls);

const rowContext = inject<RowContext>(rowContextSymbol, {
  gutter: 0,
  currentSize: 'xs',
});

const colClass = computed(() => {
  const classes: string[] = [];
  const pos = ['span', 'offset', 'pull', 'push'] as const;

  pos.forEach((prop) => {
    const size = props[prop];
    if (isNumber(size)) {
      if (prop === 'span') classes.push(`${prefixCls.value}-${size}`);
      else if (size > 0) classes.push(`${prefixCls.value}-${prop}-${size}`);
    }
  });

  const sizes: [RowSize, ColSize][] = [];
  rowSizes.forEach((size) => {
    const sizeValue = props[size];
    if (sizeValue) {
      sizes.push([size, sizeValue]);
    } else {
      const last = sizes[sizes.length - 1];
      if (last) {
        sizes.push([size, last[1]]);
      }
    }
  });

  sizes.forEach(([size, sizeValue]) => {
    if (isNumber(sizeValue)) {
      classes.push(`${prefixCls.value}-${size}-${sizeValue}`);
    } else if (isObject(sizeValue)) {
      Object.entries(sizeValue).forEach(([prop, value]) => {
        classes.push(
          prop === 'span'
            ? `${prefixCls.value}-${size}-${value}`
            : `${prefixCls.value}-${size}-${prop}-${value}`,
        );
      });
    }
  });

  if (rowContext.gutter) {
    classes.push(`${prefixCls.value}-guttered`);
  }

  return [hashId.value, prefixCls.value, `${prefixCls.value}-${rowContext.currentSize}`, classes];
});

const colStyle = computed(() => {
  const styles: CSSProperties = {};
  if (rowContext.gutter) {
    styles.paddingInlineStart = styles.paddingInlineEnd = `${rowContext.gutter / 2}px`;
  }
  return styles;
});
</script>
