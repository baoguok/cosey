import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    icon: { type: String, required: true },
    delta: { type: Number, required: true },
  },
  setup(props) {
    const editor = useEditor();

    const onClick = () => {
      editor.formatIndent(props.delta);
    };

    return () => {
      return (
        <Button onClick={onClick}>
          <Icon name={props.icon} />
        </Button>
      );
    };
  },
});
