import { computed, defineComponent, ref, Teleport, Transition, useTemplateRef, watch } from 'vue';
import { flip, offset, shift } from '@floating-ui/dom';
import { useZIndex } from 'element-plus';
import {
  contextMenuProps,
  contextMenuSlots,
  contextMenuEmits,
  type ContextMenuExpose,
} from './context-menu.api';
import { useItemProvide } from './useItemProvide';
import { useSubProvide } from './useSubProvide';
import { useFloating, useLockScroll } from '../../hooks';
import { OnlyChild } from '../only-child';
import useStyle from './context-menu.style';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoContextMenu',
  inheritAttrs: false,
  props: contextMenuProps,
  slots: contextMenuSlots,
  emits: contextMenuEmits,
  setup(props, { slots, emit, expose }) {
    const { prefixCls } = useComponentConfig('context-menu', props);

    const { hashId } = useStyle(prefixCls);

    const { nextZIndex } = useZIndex();

    const zIndex = ref(0);

    const pointX = ref(0);
    const pointY = ref(0);

    const pointRef = useTemplateRef<HTMLElement>('point');
    const menuRef = useTemplateRef<HTMLElement>('menu');

    const visible = ref(false);

    useLockScroll(visible);

    const { x, y, floating } = useFloating(pointRef, menuRef, {
      placement: 'right-start',
      strategy: 'fixed',
      middleware: [offset(0), flip(), shift({ padding: 5 })],
    });

    watch(visible, (visible) => {
      floating.value = visible;
    });

    const pointStyle = computed(() => {
      return {
        insetInlineStart: `${pointX.value}px`,
        insetBlockStart: `${pointY.value}px`,
        zIndex: zIndex.value,
      };
    });

    const backdropStyle = computed(() => {
      return {
        zIndex: zIndex.value,
      };
    });

    const menuStyle = computed(() => {
      return {
        insetInlineStart: `${x.value}px`,
        insetBlockStart: `${y.value}px`,
        zIndex: zIndex.value,
      };
    });

    const open = (x: number, y: number) => {
      pointX.value = x;
      pointY.value = y;

      if (!visible.value) {
        zIndex.value = nextZIndex();
        visible.value = true;
      }

      emit('open');
    };

    const close = () => {
      visible.value = false;

      emit('close');
    };

    const onBackDropClick = () => {
      close();
    };

    const onBackdropContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      close();
    };

    const onContextMenu = (event: MouseEvent) => {
      if (props.disabled) {
        return;
      }
      event.preventDefault();
      open(event.clientX, event.clientY);
    };

    const onMenuContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    // item provide
    useItemProvide({
      onSelect(command) {
        if (visible.value) {
          emit('command', command);
          close();
        }
      },
    });

    // sub provide
    useSubProvide();

    expose<ContextMenuExpose>({
      open,
      close,
    });

    return () => {
      return (
        <>
          {slots.reference && (
            <OnlyChild onContextmenu={onContextMenu}>{slots.reference({})}</OnlyChild>
          )}

          <Transition name="co-fade-out">
            {visible.value && (
              <Teleport to="body">
                <div>
                  <div
                    ref="point"
                    class={[hashId.value, `${prefixCls.value}-point`]}
                    style={pointStyle.value}
                  ></div>
                  <div
                    class={[hashId.value, `${prefixCls.value}-mask`]}
                    style={backdropStyle.value}
                    onClick={onBackDropClick}
                    onContextmenu={onBackdropContextMenu}
                  ></div>
                  <div
                    ref="menu"
                    v-bind="$attrs"
                    class={[hashId.value, prefixCls.value]}
                    style={menuStyle.value}
                    onContextmenu={onMenuContextMenu}
                  >
                    {slots.default?.({})}
                  </div>
                </div>
              </Teleport>
            )}
          </Transition>
        </>
      );
    };
  },
});
