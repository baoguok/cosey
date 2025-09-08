import { defineComponent, h, mergeProps } from 'vue';
import {
  fieldRemoteSelectEmits,
  fieldRemoteSelectProps,
  fieldRemoteSelectSlots,
} from './remote-select.api';
import { addNullablePlaceholder } from '../../../../utils';
import { useLocale } from '../../../../hooks';
import { RemoteSelect } from '../../../remote-select';

export default defineComponent({
  name: 'CoFieldRemoteSelect',
  inheritAttrs: false,
  props: fieldRemoteSelectProps,
  slots: fieldRemoteSelectSlots,
  emits: fieldRemoteSelectEmits,
  setup(props, { slots }) {
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
});
