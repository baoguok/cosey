<template>
  <div
    :class="[
      `${prefixCls}-split`,
      {
        'is-active': chevronActive,
      },
    ]"
  >
    <Button :active="active" @click="onBtnClick">
      <slot></slot>
    </Button>
    <Button
      ref="chevronButton"
      :active="chevronActive"
      :class="`${prefixCls}-chevron`"
      @click="onChevronClick"
    >
      <Icon :class="`${prefixCls}-arrow`" name="co:chevron-down" size="lg" />
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, useTemplateRef } from 'vue';
import { useComponentConfig } from '../config-provider';
import Icon from '../icon/icon.vue';
import { pickerContextKey } from './picker/picker';
import Button from './button.vue';

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
    pickerContext.triggerTarget.value = chevronButtonRef.value!.el as HTMLElement;
  }
});
</script>
