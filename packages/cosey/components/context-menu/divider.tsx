import { defineComponent } from 'vue';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  setup() {
    const { prefixCls } = useComponentConfig('context-menu');

    return () => {
      return <div class={`${prefixCls.value}-divider`}></div>;
    };
  },
});
