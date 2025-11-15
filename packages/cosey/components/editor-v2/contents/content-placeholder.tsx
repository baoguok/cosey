import { defineComponent } from 'vue';
import { useComponentConfig } from '../../config-provider';
import useStyle from './content-placeholder.style';

export default defineComponent({
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('editor-v2-placeholder', props);
    const { hashId } = useStyle(prefixCls);

    return () => {
      return <div class={[hashId.value, prefixCls.value]}>{slots.default?.()}</div>;
    };
  },
});
