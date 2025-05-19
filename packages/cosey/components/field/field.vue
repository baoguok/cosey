<template>
  <component :is="template" />
</template>

<script setup lang="ts" generic="T extends FieldType">
import { computed } from 'vue';
import { mapFieldTypeComponent, type FeildProps, type FieldType } from './field';
import { defineTemplate } from '../../utils';

defineOptions({
  name: 'Field',
  inheritAttrs: false,
});

const props = defineProps<FeildProps<T>>();

const slots = defineSlots<FeildProps<T>>();

const component = computed(() => {
  return mapFieldTypeComponent[props.type || 'input'];
});

const mergedComponentProps = computed(() => {
  return {
    ref: props.componentRef,
    ...props.componentProps,
  };
});

const template = defineTemplate((h) => {
  return h(
    component.value,
    {
      readonly: props.readonly,
      componentProps: mergedComponentProps.value,
    },
    slots,
  );
});
</script>
