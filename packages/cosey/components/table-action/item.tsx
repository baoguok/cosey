import { computed, defineComponent, ref } from 'vue';
import { omit } from 'lodash-es';
import { ElButton, ElPopconfirm } from 'element-plus';
import { tableActionItemProps } from './item.api';
import Icon from '../icon/icon.vue';
import { useToken } from '../theme';
import { useLocale } from '../../hooks';

export default defineComponent({
  name: 'CoTableActionItem',
  inheritAttrs: false,
  props: tableActionItemProps,
  setup(props) {
    const { t } = useLocale();

    const { token } = useToken();

    const buttonProps = computed(() => {
      return omit(props, 'icon');
    });

    const loading = ref(false);

    const mergedVisible = computed(() => {
      return props.hidden ? false : props.visible;
    });

    const onConfirm = async (e: MouseEvent, confirm: (e: MouseEvent) => void) => {
      loading.value = true;
      try {
        await props.popconfirm?.confirm?.(e);
        confirm(e);
      } catch {
        void 0;
      } finally {
        loading.value = false;
      }
    };

    const onCancel = (e: MouseEvent, cancel: (e: MouseEvent) => void) => {
      cancel(e);
    };

    return () => {
      if (!mergedVisible.value) return;

      if (props.popconfirm) {
        return (
          <ElPopconfirm {...props.popconfirm}>
            {{
              reference: () => (
                <ElButton {...omit(buttonProps.value, 'popconfirm')} style="margin: 0">
                  {props.icon && (
                    <Icon
                      name={props.icon}
                      style={{ marginInlineEnd: token.value.marginXXS + 'px' }}
                    />
                  )}
                  {props.label}
                </ElButton>
              ),
              actions: ({ confirm, cancel }: any) => {
                return (
                  <>
                    <ElButton size="small" onClick={(event) => onCancel(event, cancel)}>
                      {t('co.common.no')}
                    </ElButton>
                    <ElButton
                      type="danger"
                      size="small"
                      loading={loading.value}
                      onClick={(event) => onConfirm(event, confirm)}
                    >
                      {t('co.common.yes')}
                    </ElButton>
                  </>
                );
              },
            }}
          </ElPopconfirm>
        );
      }

      return (
        <ElButton {...buttonProps.value} style="margin: 0">
          {props.icon && (
            <Icon name={props.icon} style={{ marginInlineEnd: token.value.marginXXS + 'px' }} />
          )}
          {props.label}
        </ElButton>
      );
    };
  },
});
