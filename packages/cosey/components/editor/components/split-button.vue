<template>
  <div
    :class="[
      `${prefixCls}-split`,
      {
        'is-active': chevronActive,
      },
    ]"
  >
    <button
      type="button"
      :class="[
        prefixCls,
        {
          'is-active': active,
        },
      ]"
      @click="onBtnClick"
    >
      <slot></slot>
    </button>
    <button
      ref="chevronButton"
      type="button"
      :class="[
        prefixCls,
        `${prefixCls}-chevron`,
        {
          'is-active': chevronActive,
        },
      ]"
      @click="onChevronClick"
    >
      <Icon :class="`${prefixCls}-arrow`" name="co:chevron-down" size="lg" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, useTemplateRef } from 'vue';
import { useComponentConfig } from '../../config-provider';
import { Icon } from '../../icon';
import { pickerContextKey } from './picker/picker';

defineProps<{
  chevronActive?: boolean;
  active?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
  (e: 'chevron-click', event: MouseEvent): void;
}>();

const { prefixCls } = useComponentConfig('editor-button');

const onBtnClick = (event: MouseEvent) => {
  emit('click', event);
};

const onChevronClick = (event: MouseEvent) => {
  emit('chevron-click', event);
};

const chevronButtonRef = useTemplateRef('chevronButton');

const pickerContext = inject(pickerContextKey, null);

onMounted(() => {
  if (pickerContext) {
    pickerContext.triggerTarget.value = chevronButtonRef.value as HTMLElement;
  }
});
</script>
