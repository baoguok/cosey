import { dndSortProps, dndSortSlots, dndSortEmits } from './dnd-sort.api';
import { defineComponent, toRef } from 'vue';
import { useDndSort } from './useDndSort';
import { h } from 'vue';

export default defineComponent({
  name: 'CoDndSort',
  inheritAttrs: false,
  props: dndSortProps,
  slots: dndSortSlots,
  emits: dndSortEmits,
  setup(props, { attrs, slots, emit }) {
    useDndSort({
      onMove(fromIndex, toIndex) {
        emit('move', fromIndex, toIndex);
      },
      disabled: toRef(() => props.disabled),
    });

    return () => {
      if (props.tag) {
        return h(props.tag, attrs, slots);
      }
      return slots.default?.({});
    };
  },
});
