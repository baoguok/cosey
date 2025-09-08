<template>
  <div
    :class="[
      hashId,
      prefixCls,
      {
        'is-focus': isFocused,
      },
      'el-input__wrapper',
    ]"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <div :class="`${prefixCls}-start`">
      <ElInputNumber
        v-model="start"
        :min="min"
        :max="max"
        :step="step"
        :step-strictly="stepStrictly"
        :precision="precision"
        :controls="false"
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="startPlaceholder"
      />
    </div>
    <div :class="`${prefixCls}-separator`">-</div>
    <div :class="`${prefixCls}-end`">
      <ElInputNumber
        v-model="end"
        :min="min"
        :max="max"
        :step="step"
        :step-strictly="stepStrictly"
        :precision="precision"
        :controls="false"
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="endPlaceholder"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type InputNumberRangeProps,
  type InputNumberRangeSlots,
  type InputNumberRangeEmits,
  type InputNumberRangeExpose,
  defaultInputNumberRangeProps,
} from './input-number-range';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';
import { CHANGE_EVENT, ElInputNumber, useFormItem } from 'element-plus';
import { ref, watch } from 'vue';
import { debugWarn } from 'element-plus/es/utils/error.mjs';
import { isNullish } from '../../utils';

defineOptions({
  name: 'CoInputNumberRange',
});

const props = withDefaults(defineProps<InputNumberRangeProps>(), defaultInputNumberRangeProps);

defineSlots<InputNumberRangeSlots>();

const emit = defineEmits<InputNumberRangeEmits>();

const { prefixCls } = useComponentConfig('input-number-range', props);

const { hashId } = useStyle(prefixCls);

const { formItem } = useFormItem();

const start = ref<number | null>(null);
const end = ref<number | null>(null);

const innerValue = ref<number[] | undefined>(props.modelValue);

watch([start, end], () => {
  const startNil = isNullish(start.value);
  const endNil = isNullish(end.value);

  if ((startNil && endNil) || (!startNil && !endNil)) {
    const value = startNil && endNil ? undefined : [start.value!, end.value!];

    if (value !== innerValue.value) {
      innerValue.value = value;
      emit('update:modelValue', value);
      emit('change', value);
    }
  }
});

watch(
  () => props.modelValue,
  () => {
    if (props.validateEvent) {
      formItem?.validate?.(CHANGE_EVENT).catch((err) => debugWarn(err));
    }
  },
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (innerValue.value !== newValue) {
      innerValue.value = newValue;
      if (!newValue) {
        start.value = null;
        end.value = null;
      } else {
        let [startValue, endValue] = newValue.map((item) => {
          item = +item;
          return Number.isNaN(item) ? null : item;
        });
        start.value = startValue;
        end.value = endValue;
      }
    }
  },
);

const isFocused = ref(false);

const onFocusIn = () => {
  isFocused.value = true;
};

const onFocusOut = () => {
  isFocused.value = false;
};

defineExpose<InputNumberRangeExpose>();
</script>
