import {
  type StackDialogExpose,
  stackDialogProps,
  useStackDialog,
  stackDialogSlots,
  stackDialogEmits,
} from './stack-dialog.api';
import useStyle from './stack-dialog.style';
import { useComponentConfig } from '../config-provider';
import { createMergedExpose } from '../../utils';
import { elFormDialogExposeKeys } from '../form-dialog';
import { defineComponent, ref } from 'vue';
import { ElDialog } from 'element-plus';
import classNames from 'classnames';

export default defineComponent({
  name: 'CoStackDialog',
  props: stackDialogProps,
  slots: stackDialogSlots,
  emits: stackDialogEmits,
  setup(props, { slots, emit, expose: _expose }) {
    const { prefixCls } = useComponentConfig('stack-dialog', props);

    const { hashId } = useStyle(prefixCls);

    const elPopupRef = ref();

    const expose = createMergedExpose(elFormDialogExposeKeys, () => elPopupRef.value);

    _expose<StackDialogExpose>(expose);

    const { onShow, onHide, info } = useStackDialog();

    return () => {
      return (
        <ElDialog
          ref={elPopupRef}
          {...props}
          class={[hashId.value, prefixCls.value]}
          headerClass={classNames(props.headerClass, `${prefixCls.value}-header`)}
          bodyClass={classNames(props.bodyClass, `${prefixCls.value}-body`)}
          footerClass={classNames(props.footerClass, `${prefixCls.value}-footer`)}
          onUpdate:modelValue={(value) => emit('update:modelValue', value)}
          style={{ maxWidth: props.fullscreen ? null : 'calc(100vw - 32px)', ...info }}
          append-to-body={true}
          onOpen={() => {
            onShow();
            emit('open');
          }}
          onOpened={() => {
            onShow();
            emit('opened');
          }}
          onClose={() => {
            onHide();
            emit('close');
          }}
          onClosed={() => {
            onHide();
            emit('closed');
          }}
          v-slots={slots}
        />
      );
    };
  },
});
