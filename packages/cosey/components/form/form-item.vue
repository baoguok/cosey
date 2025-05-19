<template>
  <OptionalWrapper :when="formContext?.grid" :component="Col" :props="mergedColProps">
    <el-form-item
      v-bind="mergedFormItemProps"
      ref="form-item"
      :class="[hashId, `${prefixCls}-item`]"
    >
      <template v-if="label || $slots.label" #label>
        <component v-if="label" :is="labelTemplate"></component>
        <slot v-else name="label"></slot>

        <el-tooltip v-if="tooltip || $slots.tooltip" placement="top">
          <template #content>
            <component v-if="tooltip" :is="tooptipTemplate"></component>
            <slot v-else name="tooltip"></slot>
          </template>
          <Icon name="co:help" :class="`${prefixCls}-item-label-icon`" size="md" />
        </el-tooltip>
      </template>
      <div :class="`${prefixCls}-item-content`" :style="fixedWidthStyle">
        <slot>
          <Field
            :readonly="mergedReadonly"
            :type="fieldType"
            :component-props="mergedFieldProps"
            :component-ref="fieldRef"
          >
            <template v-for="name in fieldSlotNames" #[name]="slotProps">
              <slot v-bind="slotProps" :name="name"></slot>
            </template>
          </Field>
        </slot>
        <div v-if="extra || $slots.extra" :class="`${prefixCls}-item-extra`">
          <component v-if="extra" :is="extraTemplate"></component>
          <slot v-else name="extra"></slot>
        </div>
      </div>
      <template v-for="name in formItemSlotNames" #[name]="slotProps">
        <slot v-bind="slotProps" :name="name"></slot>
      </template>
    </el-form-item>
  </OptionalWrapper>
</template>

<script setup lang="tsx" generic="T extends FieldType">
/**
 * 为了能正确推断组件的属性和插槽，需要使用泛型组件；
 * 有两种泛型组件定义方式：
 *   1. setup generic
 *   2. defineComponent 函数签名
 * 理论上使用方式2可以用jsx灵活地传递插槽和属性到子组件，但泛型参数无法传递到插槽类型，因此只能选择方式 1。
 */

import { computed, inject, mergeProps, useAttrs, useTemplateRef } from 'vue';
import {
  type FormItemSlots,
  type FormItemEmits,
  type FormItemProps,
  formItemExposeKeys,
  defaultFormItemProps,
} from './form-item';
import { type FormContext, formContextSymbol } from './form';
import { type MapFieldTypeComponentProps, type FieldType, Field } from '../field';
import { type FormQueryContext, formQueryContextSymbol } from '../form-query/form-query';
import { OptionalWrapper } from '../optional-wrapper';
import { Col } from '../col';
import Icon from '../icon/icon.vue';
import { useFormItemWidth } from './useFormItemWidth';
import { omitUndefined, defineTemplate, createMergedExpose } from '../../utils';
import { ElFormItem, type FormItemInstance } from 'element-plus';
import { reactiveOmit } from '@vueuse/core';
import { useComponentConfig } from '../config-provider';
import { useToken } from '../theme';

defineOptions({
  name: 'FormItem',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<FormItemProps<T>>(), defaultFormItemProps);

const { prefixCls } = useComponentConfig('form', props);

const { hashId } = useToken();

const formItemProps = reactiveOmit(
  props,
  'colProps',
  'width',
  'fieldType',
  'fieldProps',
  'fieldRef',
  'modelValue',
  'placeholder',
  'disabled',
  'readonly',
);

const attrs = useAttrs() as any;

const slots = defineSlots<FormItemSlots<T>>();

const emit = defineEmits<FormItemEmits>();

const formContext = inject<FormContext | null>(formContextSymbol, null);

const formItemRef = useTemplateRef('form-item');

defineExpose<FormItemInstance>(createMergedExpose(formItemExposeKeys, () => formItemRef.value));

// form query
const formQueryContext = inject<FormQueryContext | null>(formQueryContextSymbol, null);

const hidden = computed(() => {
  return formQueryContext && formQueryContext.shouldHide(props.internalIndex!);
});

const mergedColProps = computed(() => {
  return mergeProps(
    {
      ...attrs,
      ...formContext?.colProps,
      ...props.colProps,
    },
    {
      style: {
        display: hidden.value ? 'none' : null,
      },
    },
  );
});

const fixedWidthStyle = useFormItemWidth(props, formContext);

const mergedFormItemProps = computed(() => {
  return {
    ...(formContext?.grid ? null : attrs),
    ...formItemProps,
  };
});

const mergedFieldProps = computed(() => {
  return mergeProps(
    {
      disabled: props.disabled,
      modelValue: props.modelValue,
      'onUpdate:modelValue'(value: unknown) {
        emit('update:modelValue', value);
      },
      ...omitUndefined({
        placeholder: props.placeholder,
      }),
    },
    props.fieldProps || {},
  );
});

const mergedReadonly = computed(() => {
  return formContext?.readonly || props.readonly;
});

// slot
const formItemSlotNames = ['error'] as const;
const exlucdeFieldSlotNames = ['error', 'label', 'default', 'tooltip', 'extra'];

const fieldSlotNames = computed(() => {
  return Object.keys(slots).filter(
    (key) => !exlucdeFieldSlotNames.includes(key),
  ) as (keyof MapFieldTypeComponentProps[T]['componentSlots'])[];
});

// tooltip
const labelTemplate = defineTemplate(() => props.label);

// tooltip
const tooptipTemplate = defineTemplate(() => props.tooltip);

// extra
const extraTemplate = defineTemplate(() => props.extra);
</script>
