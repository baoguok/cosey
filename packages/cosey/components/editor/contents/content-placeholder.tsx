import { defineComponent } from 'vue';
import { useComponentConfig } from '../../config-provider';
import useStyle from './content-placeholder.style';

export default defineComponent({
  name: 'CoEditorContentPlaceholder',
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('editor-content-placeholder', props);
    const { hashId } = useStyle(prefixCls);

    return () => {
      return <div class={[hashId.value, prefixCls.value]}>{slots.default?.()}</div>;
    };
  },
});
