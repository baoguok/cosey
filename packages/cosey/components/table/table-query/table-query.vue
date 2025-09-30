<template>
  <component :is="template"></component>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, reactive, ref, unref } from 'vue';
import {
  type TableQueryEmits,
  type TableQuerySlots,
  type TableQueryExpose,
  type TableQueryCustomExpose,
  omittedTableQueryProps,
  tableQueryExposeKeys,
  tableQueryProps,
} from './table-query';
import { reactiveOmit } from '@vueuse/core';
import { createMergedExpose, defineTemplate } from '../../../utils';
import { cloneDeep } from 'lodash-es';
import { FormItem } from '../../form';
import { FormQuery, type FormQueryExpose } from '../../form-query';

defineOptions({
  name: 'CoTableQuery',
});

const props = defineProps(tableQueryProps);

const formQueryProps = reactiveOmit(props, omittedTableQueryProps);

defineSlots<TableQuerySlots>();

defineEmits<TableQueryEmits>();

const formQueryRef = ref<FormQueryExpose>();

const defaultModel = reactive<Record<string, any>>({});

const formModel = computed(() => {
  return props.model || defaultModel;
});

onBeforeMount(() => {
  props.schemes.forEach((item) => {
    unref(formModel)[item.prop as string] = item.modelValue;
  });
});

const onEnter = () => {
  formQueryRef.value?.submit();
};

// expose
const customExpose: TableQueryCustomExpose = {
  getFieldsValue() {
    return cloneDeep(unref(formModel));
  },
  setFieldsValue(value) {
    Object.assign(unref(formModel), value);
  },
  getFormModel() {
    return unref(formModel);
  },
};

defineExpose<TableQueryExpose>(
  createMergedExpose(tableQueryExposeKeys, () => formQueryRef.value, customExpose),
);

const template = defineTemplate((h) => {
  return h(
    FormQuery,
    {
      ...formQueryProps,
      ref: formQueryRef,
      model: unref(formModel),
      onKeyup: (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onEnter();
        }
      },
      onKeydown: (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      },
    },
    () => {
      return props.schemes.map((item) => {
        const { slots, render, ...rest } = item;

        if (render) {
          return h(FormItem, rest, {
            ...slots,
            default: () => {
              return render({ model: unref(formModel) });
            },
          });
        }

        return h(
          FormItem,
          {
            ...rest,
            modelValue: unref(formModel)[rest.prop as string],
            'onUpdate:modelValue': (value: any) => (unref(formModel)[rest.prop as string] = value),
          },
          slots,
        );
      });
    },
  );
});
</script>
