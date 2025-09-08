import { type Component, computed, defineComponent, h } from 'vue';
import { fieldProps, mapFieldTypeComponent, type FeildProps, type FieldType } from './field.api';

export default defineComponent(
  <T extends FieldType>(props: FeildProps<T>) => {
    const component = computed(() => {
      return mapFieldTypeComponent[props.type || 'input'];
    });

    const mergedComponentProps = computed(() => {
      return {
        ref: props.componentRef,
        ...props.componentProps,
      };
    });

    return () => {
      return h(
        component.value as Component,
        {
          readonly: props.readonly,
          componentProps: mergedComponentProps.value,
        },
        props.componentSlots,
      );
    };
  },
  {
    name: 'CoField',
    inheritAttrs: false,
    props: fieldProps,
  },
);
