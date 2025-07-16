<template>
  <ElTooltip
    :visible="visible"
    :show-arrow="false"
    placement="bottom-start"
    :offset="0"
    :gpu-acceleration="false"
    :popper-class="[hashId, popperClass, `${prefixCls}-panel`]"
    :stop-popper-mouse-event="false"
    effect="light"
    trigger="click"
    persistent
  >
    <template #content>
      <div
        ref="content"
        :class="[
          `${prefixCls}-content`,
          {
            'is-nopadding': nopadding,
          },
        ]"
        :style="{ maxHeight }"
        @mousedown.prevent
      >
        <slot name="content"></slot>
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </ElTooltip>
</template>

<script lang="ts" setup>
import { ElTooltip } from 'element-plus';
import { useComponentConfig } from '../../config-provider';
import useStyle from './picker.style';
import { computed, onBeforeUnmount, onMounted, provide, ref, useTemplateRef } from 'vue';
import { pickerContextKey } from './picker';

const props = defineProps<{
  popperClass?: any;
  visible?: boolean;
  maxHeight?: string;
  triggerTarget?: HTMLElement | null;
  nopadding?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void;
}>();

const { prefixCls } = useComponentConfig('editor-picker');
const { hashId } = useStyle(prefixCls);

const contentRef = useTemplateRef('content');

const contextTriggerTarget = ref<HTMLElement>();

provide(pickerContextKey, {
  triggerTarget: contextTriggerTarget,
});

const mergedTriggerTarget = computed(() => {
  return props.triggerTarget || contextTriggerTarget.value;
});

const onDocClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (
    !props.visible ||
    (mergedTriggerTarget.value && mergedTriggerTarget.value.contains(target)) ||
    contentRef.value?.contains(target)
  ) {
    return;
  }

  emit('update:visible', false);
};

onMounted(() => {
  document.addEventListener('click', onDocClick, false);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick, false);
});
</script>
