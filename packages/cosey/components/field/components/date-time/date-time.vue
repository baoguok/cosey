<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldDateTimeProps, type FieldDateTimeSlots } from './date-time';
import dayjs from 'dayjs';
import { addNullablePlaceholder, DATE_TIME_FORMAT } from '../../../../utils';

export default defineComponent(
  (props: FieldDateTimeProps, { slots }) => {
    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) => dayjs(val).format(DATE_TIME_FORMAT));
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
            type: 'datetime',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'FieldDateTime',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldDateTimeSlots>,
  },
);
</script>
