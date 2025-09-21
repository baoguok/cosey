import { computed, defineComponent, nextTick, reactive, ref, toRef, watch } from 'vue';
import { numberFormatProps, numberFormatSlots } from './number-format.api';
import { TransitionPresets, useTransition } from '@vueuse/core';

export default defineComponent({
  name: 'CoNumberFormat',
  props: numberFormatProps,
  slots: numberFormatSlots,
  setup(props) {
    const numValue = ref(0);

    watch(
      () => props.value,
      () => {
        nextTick(() => {
          numValue.value = Number(props.value) || 0;
        });
      },
      {
        immediate: true,
      },
    );

    const animatedValue = useTransition(
      numValue,
      reactive({
        duration: toRef(() => props.duration),
        disabled: toRef(() => !props.animate),
        transition: TransitionPresets.easeInOutQuint,
      }),
    );

    const displayValue = computed(() => {
      let value = Intl.NumberFormat(props.locales, {
        style: props.type,
        currency: props.currency,
      }).format(animatedValue.value);

      const [integer, decimal = ''] = value.split('.');
      const _decimal = decimal.padEnd(props.precision, '0').slice(0, props.precision);
      value = [integer, _decimal].join(_decimal ? '.' : '');

      return props.beforeDisplay ? props.beforeDisplay(value) : value;
    });

    return () => {
      return <span>{displayValue.value}</span>;
    };
  },
});
