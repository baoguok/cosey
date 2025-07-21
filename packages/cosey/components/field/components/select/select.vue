<script lang="ts">
import { ElOption, ElOptionGroup, ElSelect } from 'element-plus';
import { computed, defineComponent, h, mergeProps, unref, type SlotsType } from 'vue';
import {
  type FieldSelectObjectOption,
  type FieldSelectConvertedOption,
  type FieldSelectOption,
  type FieldSelectProps,
  type FieldSelectSlots,
  flatGroup,
  fieldSelectOmitKeys,
} from './select';
import { getLabelByValue, addNullablePlaceholder } from '../../../../utils';
import { omit } from 'lodash-es';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldSelectProps, { slots }) => {
    const { t } = useLocale();

    const componentProps = computed(() => props.componentProps || {});

    const omittedProps = computed(() => omit(componentProps.value, fieldSelectOmitKeys));

    function convertRecur(options: FieldSelectOption[]) {
      return options.map((option): FieldSelectConvertedOption => {
        if (typeof option === 'object') {
          if ('children' in option) {
            return {
              ...option,
              children: convertRecur(option.children) as FieldSelectObjectOption[],
            };
          }
          return {
            ...option,
            label: option[(componentProps.value.labelKey as 'label') || 'label'],
            value: option[(componentProps.value.valueKey as 'value') || 'value'],
          };
        }

        return {
          label: String(option),
          value: option,
        };
      });
    }

    const convertedOptions = computed(() => {
      return convertRecur(unref(componentProps.value.options) ?? []);
    });

    function renderOption(option: FieldSelectObjectOption) {
      return h(
        ElOption,
        {
          ...(option as any),
          key: option.value as string | number,
        },
        slots.option ? () => slots.option!(option) : undefined,
      );
    }

    return () => {
      if (props.readonly) {
        const value = componentProps.value.modelValue;
        return addNullablePlaceholder(value, (val) => {
          const label = getLabelByValue(flatGroup(convertedOptions.value), val);
          return Array.isArray(label) ? label.join(', ') : (label as string);
        });
      }

      return h(
        ElSelect,
        mergeProps(
          {
            placeholder: t('co.common.pleaseSelect'),
            clearable: true,
            style: {
              verticalAlign: 'top',
            },
          },
          omittedProps.value,
        ),
        {
          ...slots,
          default: () =>
            convertedOptions.value.map((item) =>
              'children' in item
                ? h(
                    ElOptionGroup,
                    {
                      label: item.label as string,
                      disabled: item.disabled,
                    },
                    () => item.children.map((item: any) => renderOption(item)),
                  )
                : renderOption(item),
            ),
        },
      );
    };
  },
  {
    name: 'FieldSelect',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldSelectSlots>,
  },
);
</script>
