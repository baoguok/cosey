<script lang="ts">
import { ElTimeSelect } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldTimeSelectProps, type FieldTimeSelectSlots } from './time-select';
import { addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldTimeSelectProps, { slots }) => {
    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(props.componentProps?.modelValue);
      }

      return h(
        ElTimeSelect,
        mergeProps(
          {
            placeholder: '请选择',
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
    name: 'FieldTimeSelect',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldTimeSelectSlots>,
  },
);
</script>
