<template>
  <Divider v-if="divided" />
  <Content
    v-bind="$attrs"
    :icon="icon"
    :with-icon="withIcon"
    :title="title"
    :disabled="disabled"
    @click="onClick"
    @contextmenu="onContextMenu"
    @pointerenter="onEnter"
    @pointerleave="onLeave"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue';
import {
  type ContextMenuItemProps,
  type ContextMenuItemSlots,
  type ContextMenuItemEmits,
  type ContextMenuItemExpose,
} from './context-menu-item';
import Content from './content.vue';
import Divider from './divider.vue';
import { useItemInject } from './useItemProvide';

defineOptions({
  name: 'ContextMenuItem',
  inheritAttrs: false,
});

const props = defineProps<ContextMenuItemProps>();

defineSlots<ContextMenuItemSlots>();

const emit = defineEmits<ContextMenuItemEmits>();

// iten inject
const { addItem, removeItem, select, enter, leave, withIcon } = useItemInject();

const itemInstance = reactive({
  icon: computed(() => !!props.icon),
});

onMounted(() => {
  addItem(itemInstance);
});

onBeforeUnmount(() => {
  removeItem(itemInstance);
});

const onClick = (event: MouseEvent) => {
  if (props.disabled) {
    return;
  }
  emit('click', event);
  select(props.command);
};

const onContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  if (props.disabled) {
    return;
  }
  select(props.command);
};

const onEnter = () => {
  enter(itemInstance);
};

const onLeave = () => {
  leave();
};

defineExpose<ContextMenuItemExpose>();
</script>
