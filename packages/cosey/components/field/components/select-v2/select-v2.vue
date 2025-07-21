<script lang="ts">
import { ElSelectV2 } from 'element-plus';
import { computed, defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { flatGroup, type FieldSelectV2Props, type FieldSelectV2Slots } from './select-v2';
import { addNullablePlaceholder, getLabelByValue } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldSelectV2Props, { slots }) => {
    const { t } = useLocale();

    const componentProps = computed(() => props.componentProps || {});

    return () => {
      if (props.readonly) {
        const value = componentProps.value.modelValue;
        return addNullablePlaceholder(value, (val) => {
          const label = getLabelByValue(
            flatGroup(componentProps.value.options || [], componentProps.value.props?.options),
            val,
          );
          return Array.isArray(label) ? label.join(', ') : (label as string);
        });
      }

      return h(
        ElSelectV2,
        mergeProps(
          {
            placeholder: t('co.common.pleaseSelect'),
            clearable: true,
            style: {
              verticalAlign: 'top',
            },
          },
          componentProps.value,
        ) as any,
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
