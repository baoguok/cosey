<script lang="ts">
import { ElSelectV2 } from 'element-plus';
import { defineComponent, h, type SlotsType } from 'vue';
import { type FieldSelectV2Props, type FieldSelectV2Slots } from './select-v2';

export default defineComponent(
  (props: FieldSelectV2Props, { slots }) => {
    return () => {
      if (props.readonly) {
        return props.componentProps?.modelValue as unknown as string;
      }

      return h(
        ElSelectV2,
        props.componentProps as InstanceType<typeof ElSelectV2>['$props'],
        slots,
      );
    };
  },
  {
    name: 'FieldSelectV2',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldSelectV2Slots>,
  },
);
</script>
