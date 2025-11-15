import { defineComponent, onBeforeUnmount, PropType } from 'vue';
import { ElButton } from 'element-plus';
import { isString } from '../../../utils';
import { useComponentConfig } from '../../config-provider';
import useStyle from './upload.style';
import { useLocale, useSingleUpload } from '../../../hooks';

export default defineComponent({
  name: 'CoEditorUpload',
  props: {
    file: {
      type: Object as PropType<File>,
      required: true,
    },
  },
  emits: {
    success: (url: string) => isString(url),
  },
  setup(props, { emit }) {
    const { prefixCls } = useComponentConfig('editor-v2-upload', props);
    const { hashId } = useStyle(prefixCls);
    const { t } = useLocale();

    const { sent, cancel, status, progress } = useSingleUpload(() => props.file, {
      onSuccess(url) {
        emit('success', url);
      },
    });

    const onCancel = () => {
      cancel();
    };

    const onReSend = () => {
      sent();
    };

    onBeforeUnmount(() => {
      cancel();
    });

    sent();

    return () => {
      return (
        <div class={[hashId.value, prefixCls.value]}>
          <div class={`${prefixCls.value}-content`}>
            <div class={`${prefixCls.value}-progress`}>{progress.value}%</div>
            {status.value === 'senting' && (
              <ElButton link type="primary" onClick={onCancel}>
                {t('co.upload.cancelUpload')}
              </ElButton>
            )}
            {status.value === 'error' && (
              <>
                <ElButton link type="primary" onClick={onReSend}>
                  {t('co.upload.reUpload')}
                </ElButton>
              </>
            )}
          </div>
        </div>
      );
    };
  },
});
