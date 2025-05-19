<script lang="ts">
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldUploadProps, type FieldUploadSlots } from './upload';
import { Upload } from '../../../upload';

export default defineComponent(
  (props: FieldUploadProps, { slots }) => {
    return () => {
      return h(
        Upload,
        mergeProps(props.componentProps || {}, {
          readonly: props.readonly || props.componentProps?.readonly,
        }),
        slots,
      );
    };
  },
  {
    name: 'FieldUpload',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldUploadSlots>,
  },
);
</script>
