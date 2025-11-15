import { defineComponent, PropType } from 'vue';
import { useComponentConfig } from '../../config-provider';
import useStyle from './content-list-item.style';
import { useToken } from '../../theme';

export default defineComponent({
  name: 'CoEditorContentListItem',
  props: {
    level: {
      type: Number,
      required: true,
    },
    listType: {
      type: String as PropType<'bulleted-list' | 'numbered-list'>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('editor-content-list-item', props);
    const { hashId } = useStyle(prefixCls);
    const { token } = useToken();

    return () => {
      return (
        <li
          class={[hashId.value, prefixCls.value, `is-${props.listType}`, `is-level-${props.level}`]}
          style={{
            marginLeft: (props.level + 1) * token.value.paddingXL + 'px',
          }}
        >
          {slots.default?.()}
        </li>
      );
    };
  },
});
