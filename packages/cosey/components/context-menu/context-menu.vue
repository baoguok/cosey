<template>
  <OnlyChild v-if="slots.reference" @contextmenu="onContextMenu">
    <slot name="reference"></slot>
  </OnlyChild>

  <transition name="co-fade-out">
    <teleport v-if="visible" to="body">
      <div>
        <div ref="point" :class="[hashId, `${prefixCls}-point`]" :style="pointStyle"></div>
        <div
          :class="[hashId, `${prefixCls}-mask`]"
          :style="backdropStyle"
          @click="onBackDropClick"
          @contextmenu="onBackdropContextMenu"
        ></div>
        <div
          ref="menu"
          v-bind="$attrs"
          :class="[hashId, prefixCls]"
          :style="menuStyle"
          @contextmenu="onMenuContextMenu"
        >
          <slot></slot>
        </div>
      </div>
    </teleport>
  </transition>
</template>

<script setup lang="ts">
import {
  type ContextMenuProps,
  type ContextMenuSlots,
  type ContextMenuEmits,
  type ContextMenuExpose,
} from './context-menu';
import { useItemProvide } from './useItemProvide';
import { useSubProvide } from './useSubProvide';
import { useZIndex } from 'element-plus';
import { computed, ref, useTemplateRef, watch } from 'vue';
import { useFloating, useLockScroll } from '../../hooks';
import { flip, offset, shift } from '@floating-ui/dom';
import { OnlyChild } from '../only-child';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'ContextMenu',
  inheritAttrs: false,
});

const props = defineProps<ContextMenuProps>();

const slots = defineSlots<ContextMenuSlots>();

const emit = defineEmits<ContextMenuEmits>();

const { prefixCls } = useComponentConfig('context-menu', props);

const { hashId } = useStyle(prefixCls);

const { nextZIndex } = useZIndex();

const zIndex = ref(0);

const pointX = ref(0);
const pointY = ref(0);

const pointRef = useTemplateRef('point');
const menuRef = useTemplateRef('menu');

const visible = ref(false);

useLockScroll(visible);

const { x, y, floating } = useFloating(pointRef, menuRef, {
  placement: 'right-start',
  strategy: 'fixed',
  middleware: [offset(0), flip(), shift({ padding: 5 })],
});

watch(visible, (visible) => {
  floating.value = visible;
});

const pointStyle = computed(() => {
  return {
    insetInlineStart: `${pointX.value}px`,
    insetBlockStart: `${pointY.value}px`,
    zIndex: zIndex.value,
  };
});

const backdropStyle = computed(() => {
  return {
    zIndex: zIndex.value,
  };
});

const menuStyle = computed(() => {
  return {
    insetInlineStart: `${x.value}px`,
    insetBlockStart: `${y.value}px`,
    zIndex: zIndex.value,
  };
});

const open = (x: number, y: number) => {
  pointX.value = x;
  pointY.value = y;

  if (!visible.value) {
    zIndex.value = nextZIndex();
    visible.value = true;
  }

  emit('open');
};

const close = () => {
  visible.value = false;

  emit('close');
};

const onBackDropClick = () => {
  close();
};

const onBackdropContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  close();
};

const onContextMenu = (event: MouseEvent) => {
  if (props.disabled) {
    return;
  }
  event.preventDefault();
  open(event.clientX, event.clientY);
};

const onMenuContextMenu = (event: MouseEvent) => {
  event.preventDefault();
};

// item provide
useItemProvide({
  onSelect(command) {
    if (visible.value) {
      emit('command', command);
      close();
    }
  },
});

// sub provide
useSubProvide();

defineExpose<ContextMenuExpose>({
  open,
  close,
});
</script>
