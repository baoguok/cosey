<script lang="ts">
import { ElInputNumber } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldNumberProps, type FieldNumberSlots } from './number';
import { addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldNumberProps, { slots }) => {
    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(props.componentProps?.modelValue);
      }

      return h(
        ElInputNumber,
        mergeProps(
          {
            style: {
              verticalAlign: 'top',
            },
          },
          props.componentProps ?? {},
        ),
        slots,
      );
    };
  },
  {
    name: 'FieldNumber',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldNumberSlots>,
  },
);
</script>
