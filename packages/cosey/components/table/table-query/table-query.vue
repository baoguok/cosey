<template>
  <FormQuery
    ref="formQuery"
    v-bind="formQueryProps"
    :model="formModel"
    @keyup.enter.prevent="onEnter"
  >
    <FormItem
      v-for="(item, i) in schemes"
      :key="i"
      v-bind="item"
      v-model="formModel[item.prop as string]"
    />
  </FormQuery>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, useTemplateRef } from 'vue';
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
import { createMergedExpose } from '../../../utils';
import { cloneDeep } from 'lodash-es';
import { FormItem } from '../../form';
import { FormQuery } from '../../form-query';

defineOptions({
  name: 'TableQuery',
});

const props = defineProps(tableQueryProps);

const formQueryProps = reactiveOmit(props, omittedTableQueryProps);

defineSlots<TableQuerySlots>();

defineEmits<TableQueryEmits>();

const formQueryRef = useTemplateRef('formQuery');

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
</script>
