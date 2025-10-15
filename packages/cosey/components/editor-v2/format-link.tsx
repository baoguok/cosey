import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button';
import { defineComponent } from 'vue';
import { useMarkActive } from './hooks/useMarkActive';

export default defineComponent({
  setup() {
    const editor = useEditor();

    const isMarkActive = useMarkActive('link');

    const onClick = () => {
      editor.formatMark('link');
    };

    return () => {
      return (
        <Button active={isMarkActive.value} onClick={onClick}>
          <Icon name="co:link" />
        </Button>
      );
    };
  },
});
