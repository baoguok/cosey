import { useComponentConfig } from '../../config-provider';
import useStyle from './select-list.style';
import { CSSProperties, defineComponent, PropType } from 'vue';
import { isObject } from '../../../utils';

export interface SelectListItem {
  label: string;
  value: any;
  style?: CSSProperties;
}

export default defineComponent({
  props: {
    selectedValue: {
      type: null,
    },
    list: {
      type: Array as PropType<SelectListItem[]>,
      required: true,
    },
  },
  emits: {
    select: (item: SelectListItem) => isObject(item),
  },
  setup(props, { emit }) {
    const { prefixCls } = useComponentConfig('editor-v2-select-list');
    const { hashId } = useStyle(prefixCls);

    const onSelect = (item: SelectListItem) => {
      emit('select', item);
    };

    return () => {
      return (
        <div class={[hashId.value, prefixCls.value]}>
          {props.list.map((item) => (
            <div
              key={item.value}
              class={[
                `${prefixCls.value}-item`,
                {
                  'is-active': props.selectedValue === item.value,
                },
              ]}
              style={item.style}
              onClick={() => onSelect(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      );
    };
  },
});
