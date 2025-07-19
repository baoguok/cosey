<script lang="ts">
import { ElTimeSelect } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldTimeSelectProps, type FieldTimeSelectSlots } from './time-select';
import { addNullablePlaceholder } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldTimeSelectProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        return addNullablePlaceholder(props.componentProps?.modelValue);
      }

      return h(
        ElTimeSelect,
        mergeProps(
          {
            placeholder: t('co.common.pleaseSelect'),
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
