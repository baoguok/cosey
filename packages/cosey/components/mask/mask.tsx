import { defineComponent } from 'vue';
import useStyle from './mask.style';
import { maskEmits } from './mask.api';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoMask',
  emits: maskEmits,
  setup(_, { emit }) {
    const { prefixCls } = useComponentConfig('mask');

    const { hashId } = useStyle(prefixCls);

    return () => {
      return (
        <div class={[hashId.value, prefixCls.value]} onClick={(event) => emit('click', event)} />
      );
    };
  },
});
