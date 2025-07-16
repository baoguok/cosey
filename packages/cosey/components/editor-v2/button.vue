<template>
  <button
    ref="button"
    type="button"
    :class="[
      prefixCls,
      {
        'is-active': active,
      },
    ]"
    @mousedown.prevent
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';
import { useComponentConfig } from '../config-provider';

defineProps<{
  active?: boolean;
}>();

const { prefixCls } = useComponentConfig('editor-button');

const buttonRef = useTemplateRef('button');

defineExpose({
  el: buttonRef,
});
</script>
