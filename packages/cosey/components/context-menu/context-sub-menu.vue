<template>
  <Divider v-if="divided" />
  <div ref="item" v-bind="$attrs" @click="onClick" @pointerenter="onEnter" @pointerleave="onLeave">
    <Content
      :icon="icon"
      :with-icon="withIcon"
      :title="title"
      :hover="visible"
      arrow
      :disabled="disabled"
    />
  </div>

  <transition name="co-fade-out">
    <teleport v-if="visible" to="body">
      <div
        ref="sub"
        :class="[hashId, prefixCls]"
        :style="subStyle"
        @pointerenter="onEnter"
        @pointerleave="onLeave"
      >
        <slot></slot>
      </div>
    </teleport>
  </transition>
</template>

<script setup lang="ts">
import {
  type ContextSubMenuProps,
  type ContextSubMenuSlots,
  type ContextSubMenuEmits,
  type ContextSubMenuExpose,
} from './context-sub-menu';
import { useFloating } from '../../hooks';
import { flip, offset, shift } from '@floating-ui/dom';
import { computed, onBeforeUnmount, onMounted, reactive, ref, useTemplateRef, watch } from 'vue';
import Content from './content.vue';
import Divider from './divider.vue';
import { useItemInject, useItemProvide } from './useItemProvide';
import { useSubInject, useSubProvide } from './useSubProvide';
import { useZIndex } from 'element-plus';
import { useComponentConfig } from '../config-provider';
import { useToken } from '../theme';

defineOptions({
  name: 'ContextSubMenu',
  inheritAttrs: false,
});

const props = defineProps<ContextSubMenuProps>();

defineSlots<ContextSubMenuSlots>();

defineEmits<ContextSubMenuEmits>();

const { prefixCls } = useComponentConfig('context-menu-submenu', props);

const { hashId } = useToken();

const itemRef = useTemplateRef('item');
const subRef = useTemplateRef('sub');

// sub provide
useSubProvide();

const { addItem, removeItem, select, enter, leave, withIcon } = useItemInject();

const itemInstance = reactive({
  icon: computed(() => !!props.icon),
  hide: () => {
    hide();
  },
});

onMounted(() => {
  addItem(itemInstance);
});

onBeforeUnmount(() => {
  removeItem(itemInstance);
});

// floating
const { x, y, floating } = useFloating(itemRef, subRef, {
  placement: 'right-start',
  strategy: 'fixed',
  middleware: [offset(-5), flip(), shift({ padding: 5 })],
});

const { nextZIndex } = useZIndex();

const zIndex = ref(0);

const subStyle = computed(() => {
  return {
    top: `${y.value}px`,
    left: `${x.value}px`,
    zIndex: zIndex.value,
  };
});

// hover status
const hoverStatus = ref<'left' | 'leaving' | 'entering' | 'entered'>('left');

const onEnter = () => {
  if (props.disabled) {
    return;
  }
  if (hoverStatus.value === 'left') {
    hoverStatus.value = 'entering';
  } else if (hoverStatus.value === 'leaving') {
    hoverStatus.value = 'entered';
  }
  enter(itemInstance);
};

let keepEntered = true;

const onLeave = () => {
  if (hoverStatus.value === 'entering') {
    hoverStatus.value = 'left';
  }

  if (!keepEntered) {
    if (hoverStatus.value === 'entered') {
      hoverStatus.value = 'leaving';
    }

    leave();
  }
};

const onClick = () => {
  if (props.disabled) {
    return;
  }
  hoverStatus.value = 'entered';
};

const show = () => {
  hoverStatus.value = 'entered';
};

const hide = () => {
  hoverStatus.value = 'left';
};

const visible = computed(() => {
  return hoverStatus.value === 'entered' || hoverStatus.value === 'leaving';
});

watch(visible, (visible) => {
  floating.value = visible;

  if (visible) {
    zIndex.value = nextZIndex();
  }
});

const { addSub, removeSub, showSub, hideSub } = useSubInject();

const subInstance = reactive({
  show,
  hide,
});

onMounted(() => {
  addSub(subInstance);
});

onBeforeUnmount(() => {
  removeSub(subInstance);
});

let timer: ReturnType<typeof setTimeout> | null = null;

const clear = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

onBeforeUnmount(() => {
  clear();
});

watch(hoverStatus, (value) => {
  clear();
  switch (value) {
    case 'entering':
      timer = setTimeout(() => {
        timer = null;
        hoverStatus.value = 'entered';
      }, 200);
      break;
    case 'leaving':
      timer = setTimeout(() => {
        timer = null;
        hoverStatus.value = 'left';
      }, 200);
      break;
    case 'entered':
      showSub(subInstance);
      break;
    case 'left':
      hideSub(subInstance);
      break;
  }
});

// item provide
useItemProvide({
  onSelect(command) {
    select(command);
  },
  onEnter,
  onLeave,
});

defineExpose<ContextSubMenuExpose>();
</script>
