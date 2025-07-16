<template>
  <button
    ref="button"
    type="button"
    :class="[prefixCls, `${prefixCls}-select`]"
    :style="{ width }"
    @mousedown.prevent
  >
    <div :class="[`${prefixCls}-text`]">
      <slot></slot>
    </div>
    <Icon :class="`${prefixCls}-arrow`" name="co:chevron-down" size="lg" />
  </button>
</template>

<script lang="ts" setup>
import { inject, onMounted, useTemplateRef } from 'vue';
import { useComponentConfig } from '../config-provider';
import Icon from '../icon/icon.vue';
import { pickerContextKey } from './picker/picker';

defineProps<{
  width?: string;
}>();

const { prefixCls } = useComponentConfig('editor-button');

const buttonRef = useTemplateRef('button');

const pickerContext = inject(pickerContextKey, null);

onMounted(() => {
  if (pickerContext) {
    pickerContext.triggerTarget.value = buttonRef.value as HTMLElement;
  }
});
</script>
