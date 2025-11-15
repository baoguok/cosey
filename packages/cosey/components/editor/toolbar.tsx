import { defineComponent } from 'vue';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoEditorToolbar',
  setup(props, { slots }) {
    void props;

    const { prefixCls } = useComponentConfig('editor-toolbar');

    return () => {
      return <div class={prefixCls.value}>{slots.default?.()}</div>;
    };
  },
});
