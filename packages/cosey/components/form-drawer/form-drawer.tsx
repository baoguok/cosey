import {
  type FormDrawerExpose,
  formDrawerProps,
  elFormDrawerExposeKeys,
  formDrawerSlots,
  formDrawerEmits,
} from './form-drawer.api';
import { useBubbleTemplate } from '../form';
import { useFormDialogWidth } from '../form-dialog';
import { ElDrawer } from 'element-plus';
import { computed, defineComponent, h } from 'vue';

export default defineComponent({
  name: 'CoFormDrawer',
  props: formDrawerProps,
  slots: formDrawerSlots,
  emits: formDrawerEmits,
  setup(props, { slots, emit, expose: _expose }) {
    const { visible, handleOpen, handleClosed, expose, buttonTemplate, elPopupRef } =
      useBubbleTemplate({
        props,
        emit,
        slots,
        exposeKeys: elFormDrawerExposeKeys,
      });

    const size = useFormDialogWidth(computed(() => props.size));

    _expose<FormDrawerExpose>(expose);

    return () => {
      return (
        <ElDrawer
          ref={elPopupRef}
          {...props}
          v-model={visible.value}
          style={{ maxWidth: '100vw' }}
          size={size.value}
          append-to-body={true}
          onOpen={handleOpen}
          onClosed={handleClosed}
          v-slots={{
            ...slots,
            footer: () => {
              return slots.footer ? slots.footer({}) : h(buttonTemplate);
            },
          }}
        ></ElDrawer>
      );
    };
  },
});
