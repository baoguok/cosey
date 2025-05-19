<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldDatesProps, type FieldDatesSlots } from './dates';
import dayjs from 'dayjs';
import { addNullablePlaceholder, DATE_FORMAT } from '../../../../utils';

export default defineComponent(
  (props: FieldDatesProps, { slots }) => {
    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) =>
          val.map((item) => dayjs(item).format(DATE_FORMAT)).join(', '),
        );
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
            type: 'dates',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'FieldDates',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldDatesSlots>,
  },
);
</script>
