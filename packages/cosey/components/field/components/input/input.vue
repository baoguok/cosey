<script lang="ts">
import { ElInput } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldInputProps, type FieldInputSlots } from './input';
import { addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldInputProps, { slots }) => {
    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(props.componentProps?.modelValue);
      }

      return h(
        ElInput,
        mergeProps(
          {
            placeholder: '请输入',
            clearable: true,
            style: {
              display: 'flex',
            },
          },
          props.componentProps ?? {},
        ),
        slots,
      );
    };
  },
  {
    name: 'FieldInput',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldInputSlots>,
  },
);
</script>
