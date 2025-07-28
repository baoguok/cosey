<template>
  <component :is="template"></component>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue';
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
  name: 'TableQuery',
});

const props = defineProps(tableQueryProps);

const formQueryProps = reactiveOmit(props, omittedTableQueryProps);

defineSlots<TableQuerySlots>();

defineEmits<TableQueryEmits>();

const formQueryRef = ref<FormQueryExpose>();

const formModel = reactive<Record<string, any>>({});

onBeforeMount(() => {
  props.schemes.forEach((item) => {
    formModel[item.prop as string] = item.modelValue;
  });
});

const onEnter = () => {
  formQueryRef.value?.submit();
};

// expose
const customExpose: TableQueryCustomExpose = {
  getFieldsValue() {
    return cloneDeep(formModel);
  },
  setFieldsValue(value) {
    Object.assign(formModel, value);
  },
  getFormModel() {
    return formModel;
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
      model: formModel,
      onKeyupEnterPrevent: onEnter,
    },
    () => {
      return props.schemes.map((item) => {
        const { slots, render, ...rest } = item;

        if (render) {
          return h(FormItem, rest, {
            ...slots,
            default: () => {
              return render({ model: formModel });
            },
          });
        }

        return h(
          FormItem,
          {
            ...rest,
            modelValue: formModel[rest.prop as string],
            'onUpdate:modelValue': (value: any) => (formModel[rest.prop as string] = value),
          },
          slots,
        );
      });
    },
  );
});
</script>
