import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const editor = useEditor();

    const isActive = computed(() => editor.isBlockQuoteActive());

    const onClick = () => {
      editor.formatBlockQuote();
    };

    return () => {
      return (
        <Button active={isActive.value} onClick={onClick}>
          <Icon name="co:quotes" />
        </Button>
      );
    };
  },
});
