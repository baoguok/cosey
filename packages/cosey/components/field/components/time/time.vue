<script lang="ts">
import { ElTimePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldTimeProps, type FieldTimeSlots } from './time';
import dayjs from 'dayjs';
import { addNullablePlaceholder, TIME_FORMAT } from '../../../../utils';

export default defineComponent(
  (props: FieldTimeProps, { slots }) => {
    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) => dayjs(val).format(TIME_FORMAT));
      }

      return h(
        ElTimePicker,
        mergeProps(
          {
            placeholder: '请选择',
            style: {
              display: 'flex',
              width: '100%',
            },
          },
          props.componentProps ?? {},
        ),
        slots,
      );
    };
  },
  {
    name: 'FieldTime',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldTimeSlots>,
  },
);
</script>
