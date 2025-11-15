import { useEditor } from 'slate-vue3';
import Button from '../button';
import Icon from '../../icon/icon';
import { defineComponent } from 'vue';
import { isString } from '../../../utils';

export default defineComponent({
  props: {
    icon: { type: String, required: true },
    delta: { type: Number, required: true },
  },
  emits: {
    change: (size: string) => isString(size),
  },
  setup(props, { emit }) {
    const editor = useEditor();

    const onClick = () => {
      editor.formatSizeDelta(props.delta, (numSize) => {
        emit('change', numSize + 'px');
      });
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
