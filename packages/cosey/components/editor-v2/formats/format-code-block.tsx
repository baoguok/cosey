import { useEditor } from 'slate-vue3';
import Icon from '../../icon/icon';
import Button from '../button';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const editor = useEditor();

    const isActive = computed(() => editor.isCodeBlockActive());

    const onClick = () => {
      editor.formatCodeBlock();
    };

    return () => {
      return (
        <Button active={isActive.value} onClick={onClick}>
          <Icon name="co:code-block" />
        </Button>
      );
    };
  },
});
