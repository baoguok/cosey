<template>
  <component :is="template"></component>
</template>

<script setup lang="tsx">
import {
  type StackDialogSlots,
  type StackDialogEmits,
  type StackDialogExpose,
  stackDialogProps,
  useStackDialog,
} from './stack-dialog';
import useStyle from './stack-dialog.style';
import { useComponentConfig } from '../config-provider';
import { createMergedExpose, defineTemplate } from '../../utils';
import { elFormDialogExposeKeys } from '../form-dialog';
import { ref } from 'vue';
import { ElDialog } from 'element-plus';
import classNames from 'classnames';

defineOptions({
  name: 'CoStackDialog',
});

const props = defineProps(stackDialogProps);

const slots = defineSlots<StackDialogSlots>();

const emit = defineEmits<StackDialogEmits>();

const { prefixCls } = useComponentConfig('stack-dialog', props);

const { hashId } = useStyle(prefixCls);

const elPopupRef = ref();

const expose = createMergedExpose(elFormDialogExposeKeys, () => elPopupRef.value);

defineExpose<StackDialogExpose>(expose);

const { onShow, onHide, info } = useStackDialog();

const template = defineTemplate(() => {
  return (
    <ElDialog
      ref={elPopupRef}
      {...props}
      class={[hashId.value, prefixCls.value]}
      headerClass={classNames(props.headerClass, `${prefixCls.value}-header`)}
      bodyClass={classNames(props.bodyClass, `${prefixCls.value}-body`)}
      footerClass={classNames(props.footerClass, `${prefixCls.value}-footer`)}
      onUpdate:modelValue={(value) => emit('update:modelValue', value)}
      style={{ maxWidth: props.fullscreen ? null : 'calc(100vw - 32px)', ...info }}
      append-to-body={true}
      onOpen={() => {
        onShow();
        emit('open');
      }}
      onOpened={() => {
        onShow();
        emit('opened');
      }}
      onClose={() => {
        onHide();
        emit('close');
      }}
      onClosed={() => {
        onHide();
        emit('closed');
      }}
      v-slots={slots}
    ></ElDialog>
  );
});
</script>
