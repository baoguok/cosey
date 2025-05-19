<template>
  <component :is="template"></component>
</template>

<script setup lang="tsx">
import {
  type FormDrawerSlots,
  type FormDrawerEmits,
  type FormDrawerExpose,
  formDrawerProps,
  elFormDrawerExposeKeys,
} from './form-drawer';
import { useBubbleTemplate } from '../form';
import { useFormDialogWidth } from '../form-dialog';
import { defineTemplate } from '../../utils';
import { ElDrawer } from 'element-plus';
import { computed, h } from 'vue';

defineOptions({
  name: 'FormDrawer',
});

const props = defineProps(formDrawerProps);

const slots = defineSlots<FormDrawerSlots>();

const emit = defineEmits<FormDrawerEmits>();

const { visible, handleOpen, handleClosed, expose, buttonTemplate, elPopupRef } = useBubbleTemplate(
  {
    props,
    emit,
    slots,
    exposeKeys: elFormDrawerExposeKeys,
  },
);

const size = useFormDialogWidth(computed(() => props.size));

defineExpose<FormDrawerExpose>(expose);

const template = defineTemplate(() => {
  return (
    <ElDrawer
      ref={elPopupRef}
      {...props}
      v-model={visible.value}
      style={{ maxWidth: '100vw' }}
      size={size.value}
      append-to-body={true}
      onOpen={handleOpen}
      onClosed={handleClosed}
      v-slots={{
        ...slots,
        footer: () => {
          return slots.footer ? slots.footer({}) : h(buttonTemplate);
        },
      }}
    ></ElDrawer>
  );
});
</script>
