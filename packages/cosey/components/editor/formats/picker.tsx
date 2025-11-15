import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  provide,
  ref,
  SlotsType,
  useTemplateRef,
} from 'vue';
import { ElTooltip } from 'element-plus';
import { useComponentConfig } from '../../config-provider';
import useStyle from './picker.style';
import { pickerContextKey } from './picker.api';
import { isBoolean } from '../../../utils';

export default defineComponent({
  name: 'CoEditorPicker',
  props: {
    popperClass: { type: null },
    visible: { type: Boolean },
    maxHeight: { type: String },
    triggerTarget: { type: [Object, null] as PropType<HTMLElement | null> },
    nopadding: { type: Boolean },
  },
  emits: {
    'update:visible': (visible: boolean) => isBoolean(visible),
  },
  slots: Object as SlotsType<{
    default: {};
    content: {};
  }>,
  setup(props, { slots, emit }) {
    const { prefixCls } = useComponentConfig('editor-picker');
    const { hashId } = useStyle(prefixCls);

    const contentRef = useTemplateRef<HTMLElement>('content');

    const contextTriggerTarget = ref<HTMLElement>();

    provide(pickerContextKey, {
      triggerTarget: contextTriggerTarget,
    });

    const mergedTriggerTarget = computed(() => {
      return props.triggerTarget || contextTriggerTarget.value;
    });

    const onDocClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        !props.visible ||
        (mergedTriggerTarget.value && mergedTriggerTarget.value.contains(target)) ||
        contentRef.value?.contains(target)
      ) {
        return;
      }

      emit('update:visible', false);
    };

    onMounted(() => {
      document.addEventListener('click', onDocClick, false);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', onDocClick, false);
    });

    return () => {
      return (
        <ElTooltip
          visible={props.visible}
          showArrow={false}
          placement="bottom-start"
          offset={0}
          gpuAcceleration={false}
          popperClass={[hashId.value, props.popperClass, `${prefixCls.value}-panel`]}
          stopPopperMouseEvent={false}
          effect="light"
          trigger="click"
          persistent
          v-slots={{
            default: slots.default,
            content: () => (
              <div
                ref="content"
                class={[
                  `${prefixCls.value}-content`,
                  {
                    'is-nopadding': props.nopadding,
                  },
                ]}
                style={{ maxHeight: props.maxHeight }}
                onMousedown={(event) => event.preventDefault()}
              >
                {slots.content?.({})}
              </div>
            ),
          }}
        />
      );
    };
  },
});
