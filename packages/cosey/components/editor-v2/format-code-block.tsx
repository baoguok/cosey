import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button';
import { defineComponent } from 'vue';
import { useBlockTypeActive } from './hooks/useBlockTypeActive';

export default defineComponent({
  setup() {
    const editor = useEditor();

    const isBlockActive = useBlockTypeActive('code-block');

    const onClick = () => {
      editor.formatCodeBlock();
    };

    return () => {
      return (
        <Button active={isBlockActive.value} onClick={onClick}>
          <Icon name="co:code-block" />
        </Button>
      );
    };
  },
});
