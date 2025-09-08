import { defineComponent } from 'vue';
import { cardEmits, cardProps, cardSlots } from './card.api';
import useStyle from './card.style';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoCard',
  props: cardProps,
  slots: cardSlots,
  emits: cardEmits,
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('card', props);

    const { hashId } = useStyle(prefixCls);

    return () => {
      return <div class={[hashId.value, prefixCls.value]}>{slots.default?.({})}</div>;
    };
  },
});
