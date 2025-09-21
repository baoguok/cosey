import { defineComponent } from 'vue';
import { ElScrollbar } from 'element-plus';
import { panelProps, panelSlots } from './panel.api';
import { useComponentConfig } from '../config-provider';
import useStyle from './panel.style';

export default defineComponent({
  name: 'CoPanel',
  props: panelProps,
  slots: panelSlots,
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('panel', props);

    const { hashId } = useStyle(prefixCls);

    return () => {
      return (
        <div class={[hashId.value, prefixCls.value]}>
          {(slots.header || props.header) && (
            <div class={`${prefixCls.value}-header`}>
              {slots.header ? slots.header() : props.header}
            </div>
          )}
          <ElScrollbar always maxHeight={props.maxHeight}>
            <div class={`${prefixCls.value}-body`}>{slots.default?.()}</div>
          </ElScrollbar>
        </div>
      );
    };
  },
});
