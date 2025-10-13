import { nextTick, provide, ref, SlotsType } from 'vue';
import { type FormBubbleContext, type FormBubbleData, formBubbleContextSymbol } from './form.api';
import { useTwoWayBinding } from '../../hooks';
import { defineTemplate, createMergedExpose } from '../../utils';
import { type FormDialogButtonProps, type FormDialogSlots } from '../form-dialog';
import { ElButton } from 'element-plus';
import { useLocale } from '../../hooks';
import { UnwrapSlotsType } from '../../types/helper';

interface UseBubbleTemplateOptions {
  props: {
    modelValue?: boolean;
    beforeClose?: (done: () => void) => void;
  } & FormDialogButtonProps;
  slots: UnwrapSlotsType<SlotsType<FormDialogSlots>>;
  emit: {
    (event: 'update:modelValue', visible: boolean): void;
    (event: 'open'): void;
    (event: 'closed'): void;
  };
  exposeKeys: string[];
}

export function useBubbleTemplate(options: UseBubbleTemplateOptions) {
  const { props, emit, slots, exposeKeys } = options;

  const { t } = useLocale();

  const formBubbleData = ref<FormBubbleData>();

  provide<FormBubbleContext>(formBubbleContextSymbol, {
    setFormBubbleData(data) {
      formBubbleData.value = data;
    },
  });

  const visible = useTwoWayBinding(props, emit, 'modelValue');

  let closeType: 'cancel' | 'confirm' | null = null;

  const cancel = () => {
    const done = () => {
      closeType = 'cancel';
      visible.value = false;
    };
    if (props.beforeClose) {
      props.beforeClose(done);
    } else {
      done();
    }
  };

  const confirm = async () => {
    try {
      await formBubbleData.value?.submit(true);
      closeType = 'confirm';
      visible.value = false;
    } catch (err) {
      console.error(err);
    }
  };

  const elPopupRef = ref();

  const expose = createMergedExpose(exposeKeys, () => elPopupRef.value);

  const handleOpen = () => {
    nextTick(() => {
      formBubbleData.value?.clearValidate();
    });
    emit('open');
  };

  const handleClosed = () => {
    switch (closeType) {
      case 'cancel':
        formBubbleData.value?.reset();
        break;
      default:
        formBubbleData.value?.resetFields();
        break;
    }
    closeType = null;
    emit('closed');
  };

  const buttonTemplate = defineTemplate(() => {
    return (
      !formBubbleData.value?.readonly && (
        <div>
          {slots.button ? (
            slots.button({
              cancel,
              confirm,
              submitting: !!formBubbleData.value?.submitting,
            })
          ) : (
            <>
              {!props.hideConfirm && (
                <ElButton
                  type="primary"
                  {...props.confirmProps}
                  loading={formBubbleData.value?.submitting}
                  onClick={confirm}
                >
                  {t(props.confirmText)}
                </ElButton>
              )}
              {!props.hideCancel && (
                <ElButton {...props.cancelProps} onClick={cancel}>
                  {t(props.cancelText)}
                </ElButton>
              )}
            </>
          )}
        </div>
      )
    );
  });

  return {
    visible,
    handleOpen,
    handleClosed,
    expose,
    buttonTemplate,
    elPopupRef,
  };
}
