<script lang="tsx">
import { ElAutocomplete } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldAutocompleteProps, type FieldAutocompleteSlots } from './autocomplete';
import { addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldAutocompleteProps, { slots }) => {
    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value);
      }

      return h(
        ElAutocomplete,
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
    name: 'FieldAutocomplete',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldAutocompleteSlots>,
  },
);
</script>
