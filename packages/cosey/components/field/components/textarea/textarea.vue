<script lang="ts">
import { ElInput } from 'element-plus';
import { defineComponent, h, type SlotsType } from 'vue';
import { type FieldTextareaProps, type FieldTextareaSlots } from './textarea';
import { addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldTextareaProps, { slots }) => {
    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(props.componentProps?.modelValue);
      }

      return h(
        ElInput,
        {
          placeholder: '请输入',
          clearable: true,
          ...props.componentProps,
          type: 'textarea',
        },
        slots,
      );
    };
  },
  {
    name: 'FieldTextarea',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldTextareaSlots>,
  },
);
</script>
