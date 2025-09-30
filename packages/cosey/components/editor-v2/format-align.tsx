import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button';
import { type FormatAlign } from './custom-types';
import { useBlockValueActive } from './hooks/useBlockValueActive';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    format: {
      type: String as PropType<FormatAlign>,
      required: true,
    },
  },
  setup(props) {
    const editor = useEditor();

    const isActive = useBlockValueActive('align', props.format);

    const onClick = () => {
      editor.formatAlign(props.format);
    };

    return () => {
      return (
        <Button active={isActive.value} onClick={onClick}>
          <Icon name={props.icon} />
        </Button>
      );
    };
  },
});
