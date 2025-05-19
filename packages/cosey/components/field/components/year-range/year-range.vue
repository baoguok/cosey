<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldYearRangeProps, type FieldYearRangeSlots } from './year-range';
import dayjs from 'dayjs';
import { addNullablePlaceholder, YEAR_FORMAT } from '../../../../utils';

export default defineComponent(
  (props: FieldYearRangeProps, { slots }) => {
    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) =>
          val.map((item) => dayjs(item).format(YEAR_FORMAT)).join(' - '),
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
            type: 'yearrange',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'FieldYearRange',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldYearRangeSlots>,
  },
);
</script>
