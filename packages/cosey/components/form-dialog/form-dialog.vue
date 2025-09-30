<template>
  <component :is="template"></component>
</template>

<script setup lang="tsx">
import {
  type FormDialogSlots,
  type FormDialogEmits,
  type FormDialogExpose,
  formDialogProps,
  elFormDialogExposeKeys,
} from './form-dialog';
import { useBubbleTemplate } from '../form';
import { computed, h } from 'vue';
import { useFormDialogWidth } from './useFormDialogWidth';
import { defineTemplate } from '../../utils';
import { ElDialog } from 'element-plus';

defineOptions({
  name: 'CoFormDialog',
});

const props = defineProps(formDialogProps);

const slots = defineSlots<FormDialogSlots>();

const emit = defineEmits<FormDialogEmits>();

const { visible, handleOpen, handleClosed, expose, buttonTemplate, elPopupRef } = useBubbleTemplate(
  {
    props,
    emit,
    slots,
    exposeKeys: elFormDialogExposeKeys,
  },
);

const width = useFormDialogWidth(computed(() => props.width));

defineExpose<FormDialogExpose>(expose);

const template = defineTemplate(() => {
  return (
    <ElDialog
      ref={elPopupRef}
      {...props}
      v-model={visible.value}
      style={{ maxWidth: props.fullscreen ? null : 'calc(100vw - 32px)' }}
      width={width.value}
      append-to-body={true}
      onOpen={handleOpen}
      onClosed={handleClosed}
      v-slots={{
        ...slots,
        footer: () => {
          return slots.footer ? slots.footer({}) : h(buttonTemplate);
        },
      }}
    ></ElDialog>
  );
});
</script>
