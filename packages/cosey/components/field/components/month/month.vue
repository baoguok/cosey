<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldMonthProps, type FieldMonthSlots } from './month';
import dayjs from 'dayjs';
import { addNullablePlaceholder, MONTH_FORMAT } from '../../../../utils';

export default defineComponent(
  (props: FieldMonthProps, { slots }) => {
    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) => dayjs(val).format(MONTH_FORMAT));
      }

      return h(
        ElDatePicker,
        mergeProps(
          {
            placeholder: '请选择',
            style: {
              display: 'flex',
              width: '100%',
            },
          },
          props.componentProps ?? {},
          {
            type: 'month',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'FieldMonth',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldMonthSlots>,
  },
);
</script>
