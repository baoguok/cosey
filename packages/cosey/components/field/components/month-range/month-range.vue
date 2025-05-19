<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldMonthRangeProps, type FieldMonthRangeSlots } from './month-range';
import dayjs from 'dayjs';
import { addNullablePlaceholder, MONTH_FORMAT } from '../../../../utils';

export default defineComponent(
  (props: FieldMonthRangeProps, { slots }) => {
    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) =>
          val.map((item) => dayjs(item).format(MONTH_FORMAT)).join(' - '),
        );
      }

      return h(
        ElDatePicker,
        mergeProps(
          {
            startPlaceholder: '请选择',
            endPlaceholder: '请选择',
            style: {
              display: 'flex',
              width: '100%',
            },
          },
          props.componentProps ?? {},
          {
            type: 'monthrange',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'FieldMonthRange',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldMonthRangeSlots>,
  },
);
</script>
