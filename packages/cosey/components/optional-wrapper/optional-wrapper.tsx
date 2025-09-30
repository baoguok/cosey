import { cloneVNode, defineComponent, h, isVNode } from 'vue';
import { optionalWrapperProps, optionalWrapperSlots } from './optional-wrapper.api';

export default defineComponent({
  name: 'CoOptionalWrapper',
  inheritAttrs: false,
  props: optionalWrapperProps,
  slots: optionalWrapperSlots,
  setup(props, { slots, attrs }) {
    return () => {
      if (props.when) {
        return h(
          props.component!,
          {
            ...props.props,
            ...attrs,
          },
          slots,
        );
      }

      const defaultSlot = slots.default?.({});

      if (Array.isArray(defaultSlot) && defaultSlot.length === 0 && isVNode(defaultSlot[0])) {
        return cloneVNode(defaultSlot[0], attrs);
      }

      return defaultSlot;
    };
  },
});
