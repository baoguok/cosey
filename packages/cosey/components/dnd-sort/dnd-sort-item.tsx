import { dndSortItemProps, dndSortItemSlots } from './dnd-sort-item.api';
import { defineComponent, reactive, toRef } from 'vue';
import { useDndSortItem } from './useDndSortItem';
import Icon from '../icon/icon';
import useStyle from './dnd-sort.style';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoDndSortItem',
  props: dndSortItemProps,
  slots: dndSortItemSlots,
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('dnd-sort', props);

    const { hashId } = useStyle(prefixCls);

    const { disabled, itemRef, holderRef, itemBinder, holderBinder } = useDndSortItem(
      reactive({
        index: toRef(() => props.index!),
      }),
    );

    return () => {
      return (
        <div ref={itemRef} {...itemBinder}>
          <div class={[hashId.value, `${prefixCls.value}-item`]}>
            {slots.prepend?.({})}
            {!disabled.value && (
              <div ref={holderRef} {...holderBinder} class={`${prefixCls.value}-item-holder`}>
                <Icon name="co:draggable" size="lg" />
              </div>
            )}
            <div class={`${prefixCls.value}-item-content`}>{slots.default?.({})}</div>
          </div>
        </div>
      );
    };
  },
});
