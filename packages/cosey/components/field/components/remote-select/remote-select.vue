<script lang="ts">
import { defineComponent, h, mergeProps } from 'vue';
import { type FieldRemoteSelectProps, type FieldRemoteSelectSlots } from './remote-select';
import { addNullablePlaceholder } from '../../../../utils';
import { useLocale } from '../../../../hooks';
import { RemoteSelect } from '../../../remote-select';

export default defineComponent(
  (props: FieldRemoteSelectProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) => val);
      }

      return h(
        RemoteSelect,
        mergeProps(
          {
            placeholder: t('co.common.pleaseSelect'),
            clearable: true,
            style: {
              verticalAlign: 'top',
            },
          },
          props.componentProps || {},
        ),
        slots,
      );
    };
  },
  {
    name: 'FieldRemoteSelect',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as FieldRemoteSelectSlots,
  },
);
</script>
