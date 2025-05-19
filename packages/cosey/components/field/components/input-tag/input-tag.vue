<script lang="ts">
import { ElInputTag } from 'element-plus';
import { defineComponent, h, type SlotsType } from 'vue';
import { type FieldInputTagProps, type FieldInputTagSlots } from './input-tag';
import { addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldInputTagProps, { slots }) => {
    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) => val.join(', '));
      }

      return h(
        ElInputTag,
        {
          placeholder: '请输入',
          clearable: true,
          ...props.componentProps,
        },
        slots,
      );
    };
  },
  {
    name: 'FieldInputTag',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldInputTagSlots>,
  },
);
</script>
