<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldWeekProps, type FieldWeekSlots } from './week';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import { addNullablePlaceholder } from '../../../../utils';

dayjs.extend(weekOfYear);

export default defineComponent(
  (props: FieldWeekProps, { slots }) => {
    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) => dayjs(val).format('YYYY-第w周'));
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
            type: 'week',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'FieldWeek',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldWeekSlots>,
  },
);
</script>
