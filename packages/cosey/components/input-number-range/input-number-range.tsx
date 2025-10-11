import { inputNumberRangeProps, inputNumberRangeEmits } from './input-number-range.api';
import useStyle from './input-number-range.style';
import { useComponentConfig } from '../config-provider';
import { CHANGE_EVENT, ElInputNumber, useFormItem } from 'element-plus';
import { defineComponent, ref, watch } from 'vue';
import { debugWarn, isNullish } from '../../utils';

export default defineComponent({
  name: 'CoInputNumberRange',
  props: inputNumberRangeProps,
  emits: inputNumberRangeEmits,
  setup(props, { emit }) {
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
            const [startValue, endValue] = newValue.map((item) => {
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

    return () => {
      return (
        <div
          class={[
            hashId.value,
            prefixCls.value,
            {
              'is-focus': isFocused.value,
            },
            'el-input__wrapper',
          ]}
          onFocusin={onFocusIn}
          onFocusout={onFocusOut}
        >
          <div class={`${prefixCls.value}-start`}>
            <ElInputNumber
              v-model={start.value}
              min={props.min}
              max={props.max}
              step={props.step}
              stepStrictly={props.stepStrictly}
              precision={props.precision}
              controls={false}
              readonly={props.readonly}
              disabled={props.disabled}
              placeholder={props.startPlaceholder}
            />
          </div>
          <div class={`${prefixCls.value}-separator`}>-</div>
          <div class={`${prefixCls.value}-end`}>
            <ElInputNumber
              v-model={end.value}
              min={props.min}
              max={props.max}
              step={props.step}
              stepStrictly={props.stepStrictly}
              precision={props.precision}
              controls={false}
              readonly={props.readonly}
              disabled={props.disabled}
              placeholder={props.endPlaceholder}
            />
          </div>
        </div>
      );
    };
  },
});
