import { defineComponent } from 'vue';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoEditorButtonGroup',
  setup(_, { slots }) {
    const { prefixCls } = useComponentConfig('editor-button-group');
    return () => {
      return <div class={`${prefixCls.value}`}>{slots.default?.()}</div>;
    };
  },
});
