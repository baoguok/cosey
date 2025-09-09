import { computed, defineComponent, Transition } from 'vue';
import { ElButton, ElProgress } from 'element-plus';
import { type UploadFileStatus, uploadItemProps, uploadItemEmits } from './upload.api';
import { isString } from '../../utils';
import { MediaCard } from '../media-card';
import Icon from '../icon/icon.vue';
import { useLocale } from '../../hooks';

import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoUploadItem',
  props: uploadItemProps,
  emits: uploadItemEmits,
  setup(props, { emit }) {
    const { prefixCls } = useComponentConfig('upload');

    const { t } = useLocale();

    const progressStatus = {
      success: 'success',
      error: 'exception',
    } as const;

    const getProgressStatus = (status: UploadFileStatus) => {
      return progressStatus[status as keyof typeof progressStatus];
    };

    const progressFormat = (percentage: number) => {
      return Math.floor(percentage) + '%';
    };

    const showRemove = computed(
      () => !props.readonly && (props.file.status === 'unready' || props.file.status === 'success'),
    );

    const mergedTitle = computed(() => (isString(props.file.url) ? props.file.url : ''));

    return () => {
      return (
        <div class={`${prefixCls.value}-item is-${props.size}`}>
          <MediaCard
            ref="media"
            src={props.file.previewUrl}
            name={props.file.name}
            type={props.file.type}
            size={props.size}
            title={mergedTitle.value}
          />
          <Transition name="co-fade">
            {(props.file.status === 'loading' || props.file.status === 'error') && (
              <div class={`${prefixCls.value}-status`}>
                <ElProgress
                  percentage={props.file.percent}
                  type="circle"
                  width={64}
                  status={getProgressStatus(props.file.status)}
                >
                  {({ percentage }: any) => {
                    return props.file.status === 'error' ? (
                      <Icon name="co:close-filled" size="lg" />
                    ) : (
                      <span class={`${prefixCls.value}-progress-text`}>
                        {progressFormat(percentage)}
                      </span>
                    );
                  }}
                </ElProgress>

                <div class={`${prefixCls.value}-actions`}>
                  {props.file.status === 'loading' && (
                    <ElButton link size="small" type="primary" onClick={() => emit('cancel')}>
                      {t('co.upload.cancelUpload')}
                    </ElButton>
                  )}
                  {props.file.status === 'error' && (
                    <ElButton
                      link
                      size="small"
                      type="primary"
                      style={{ marginInlineStart: 0 }}
                      onClick={() => emit('re-upload')}
                    >
                      {t('co.upload.reUpload')}
                    </ElButton>
                  )}
                  <ElButton
                    link
                    size="small"
                    type="primary"
                    style={{ marginInlineStart: 0 }}
                    onClick={() => emit('remove')}
                  >
                    {t('co.common.delete')}
                  </ElButton>
                </div>
              </div>
            )}
          </Transition>
          {showRemove.value && (
            <div class={`${prefixCls.value}-remove`} onClick={() => emit('remove')}>
              <Icon name="co:close-large" />
            </div>
          )}
        </div>
      );
    };
  },
});
