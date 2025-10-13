import { computed, defineComponent } from 'vue';
import { ElScrollbar, ElTooltip } from 'element-plus';
import { longTextProps, longTextSlots } from './long-text.api';
import useStyle from './long-text.style';
import { addPxUnit } from '../../utils';
import { useComponentConfig } from '../config-provider';
import Copy from '../copy';

export default defineComponent({
  name: 'CoLongText',
  props: longTextProps,
  slots: longTextSlots,
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('long-text');

    const { hashId } = useStyle(prefixCls);

    const textStyle = computed(() => {
      return {
        '-webkit-line-clamp': props.rows,
      };
    });

    return () => {
      return (
        <ElTooltip
          placement="top"
          showAfter={200}
          v-slots={{
            default: () => (
              <div class={[hashId.value, prefixCls.value]} style={textStyle.value}>
                {props.text || slots.default?.({})}
              </div>
            ),
            content: () => (
              <div class={[hashId.value, `${prefixCls.value}-tooltip`]}>
                <ElScrollbar
                  class={`${prefixCls.value}-scrollbar`}
                  maxHeight={props.maxHeight}
                  style={{ maxWidth: addPxUnit(props.maxWidth) }}
                  always
                >
                  {props.text || slots.default?.({})}
                </ElScrollbar>
                <Copy text={props.text} color="inherit" class={`${prefixCls.value}-copy`} />
              </div>
            ),
          }}
        />
      );
    };
  },
});
