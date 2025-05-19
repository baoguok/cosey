<script lang="ts">
import { ElRadio, ElRadioButton, ElRadioGroup } from 'element-plus';
import { computed, defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldRadioGroupProps, type FieldRadioGroupSlots } from './radio-group';
import { getLabelByValue, addNullablePlaceholder } from '../../../../utils';

export default defineComponent(
  (props: FieldRadioGroupProps) => {
    const componentProps = computed(() => props.componentProps || {});

    const convertedOptions = computed(() => {
      return (componentProps.value.options ?? []).map((option) => {
        if (typeof option === 'object') {
          return {
            ...option,
            label: option[(componentProps.value.labelKey as 'label') || 'label'],
            value: option[(componentProps.value.valueKey as 'value') || 'value'],
          };
        }
        return {
          label: option,
          value: option,
        };
      });
    });

    const radioType = computed(() => {
      return componentProps.value.type === 'button' ? ElRadioButton : ElRadio;
    });

    return () => {
      if (props.readonly) {
        const value = componentProps.value.modelValue;
        return addNullablePlaceholder(value, (val) => getLabelByValue(convertedOptions.value, val));
      }

      return h(
        ElRadioGroup,
        mergeProps(
          {
            style: {
              verticalAlign: 'top',
            },
          },
          props.componentProps ?? {},
        ),
        () =>
          convertedOptions.value.map((item) =>
            h(radioType.value, {
              ...item,
              key: item.value as string | number,
            }),
          ),
      );
    };
  },
  {
    name: 'FieldRadio',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldRadioGroupSlots>,
  },
);
</script>
