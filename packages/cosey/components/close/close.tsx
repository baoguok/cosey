import { defineComponent } from 'vue';
import Icon from '../icon/icon.vue';
import useStyle from './close.style';
import { useComponentConfig } from '../config-provider';
import { closeEmits } from './close.api';

export default defineComponent({
  name: 'CoClose',
  emits: closeEmits,
  setup(props, { emit }) {
    const { prefixCls } = useComponentConfig('close', props);

    const { hashId } = useStyle(prefixCls);

    return () => {
      return (
        <span class={[hashId.value, prefixCls.value]} onClick={(event) => emit('click', event)}>
          <Icon name="co:close-large" />
        </span>
      );
    };
  },
});
