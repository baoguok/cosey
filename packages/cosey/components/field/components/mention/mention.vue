<script lang="ts">
import { ElMention } from 'element-plus';
import { defineComponent, h, type SlotsType, mergeProps } from 'vue';
import { type FieldMentionProps, type FieldMentionSlots } from './mention';
import { addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldMentionProps, { slots }) => {
    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(props.componentProps?.modelValue);
      }

      return h(
        ElMention,
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
    name: 'FieldMention',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldMentionSlots>,
  },
);
</script>
