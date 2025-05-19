<script lang="ts">
import { cloneVNode, defineComponent, h, isVNode, type SlotsType } from 'vue';
import { type OptionalWrapperSlots } from './optional-wrapper';

export default defineComponent(
  (props, { slots, attrs }) => {
    return () => {
      if (props.when) {
        return h(
          props.component,
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
  {
    name: 'OptionalWrapper',
    inheritAttrs: false,
    props: ['when', 'component', 'props'],
    slots: {} as SlotsType<OptionalWrapperSlots>,
  },
);
</script>
