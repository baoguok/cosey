<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldYearProps, type FieldYearSlots } from './year';
import dayjs from 'dayjs';
import { addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldYearProps, { slots }) => {
    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) => dayjs(val).get('y'));
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
            type: 'year',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'FieldYear',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldYearSlots>,
  },
);
</script>
