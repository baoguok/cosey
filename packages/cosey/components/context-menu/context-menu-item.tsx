import { computed, defineComponent, onBeforeUnmount, onMounted, reactive } from 'vue';
import {
  contextMenuItemEmits,
  contextMenuItemProps,
  contextMenuItemSlots,
} from './context-menu-item.api';
import Content from './content';
import Divider from './divider';
import { useItemInject } from './useItemProvide';

export default defineComponent({
  name: 'CoContextMenuItem',
  inheritAttrs: false,
  props: contextMenuItemProps,
  slots: contextMenuItemSlots,
  emits: contextMenuItemEmits,
  setup(props, { attrs, emit }) {
    // iten inject
    const { addItem, removeItem, select, enter, leave, withIcon } = useItemInject();

    const itemInstance = reactive({
      icon: computed(() => !!props.icon),
    });

    onMounted(() => {
      addItem(itemInstance);
    });

    onBeforeUnmount(() => {
      removeItem(itemInstance);
    });

    const onClick = (event: MouseEvent) => {
      if (props.disabled) {
        return;
      }
      emit('click', event);
      select(props.command);
    };

    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      if (props.disabled) {
        return;
      }
      select(props.command);
    };

    const onEnter = () => {
      enter(itemInstance);
    };

    const onLeave = () => {
      leave();
    };

    return () => (
      <>
        {props.divided && <Divider />}
        <Content
          {...attrs}
          icon={props.icon}
          with-icon={withIcon.value}
          title={props.title}
          disabled={props.disabled}
          onClick={onClick}
          onContextmenu={onContextMenu}
          onPointerenter={onEnter}
          onPointerleave={onLeave}
        />
      </>
    );
  },
});
