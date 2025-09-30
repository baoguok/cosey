import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button';
import { useBlockTypeActive } from './hooks/useBlockTypeActive';
import { type ListType } from './custom-types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    icon: { type: String, required: true },
    format: { type: String as PropType<ListType>, required: true },
  },
  setup(props) {
    const editor = useEditor();

    const isBlockActive = useBlockTypeActive(props.format);

    const onClick = () => {
      editor.formatList(props.format);
    };

    return () => {
      return (
        <Button active={isBlockActive.value} onClick={onClick}>
          <Icon name={props.icon} />
        </Button>
      );
    };
  },
});
