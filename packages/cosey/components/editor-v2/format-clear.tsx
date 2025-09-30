import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const editor = useEditor();

    const onClick = () => {
      editor.clearForamts();
    };

    return () => {
      return (
        <Button onClick={onClick}>
          <Icon name="co:text-clear-format" />
        </Button>
      );
    };
  },
});
