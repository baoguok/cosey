import { computed, defineComponent } from 'vue';
import { ribbonProps, ribbonSlots, ribbonEmits } from './ribbon.api';
import { useComponentConfig } from '../config-provider';
import { useToken } from '../theme';
import useStyle from './ribbon.style';

export default defineComponent({
  name: 'CoRibbon',
  props: ribbonProps,
  slots: ribbonSlots,
  emits: ribbonEmits,
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('ribbon', props);

    const { hashId } = useStyle(prefixCls);

    const { token } = useToken();

    const ribbon = computed(() => {
      return {
        width: props.size + 'px',
        height: props.size + 'px',
        '--gap': props.gap + 'px',
        '--bg': props.background || token.value.colorPrimary,
      };
    });

    const silkStyle = computed(() => {
      const hypotenuse = Math.sqrt(Math.pow(props.size, 2) * 2);
      const breadth = (hypotenuse / 2) * props.breadth;

      return {
        width: hypotenuse + 'px',
        height: breadth + 'px',
        color: props.color,
      };
    });

    return () => {
      return (
        <div class={[hashId.value, prefixCls.value, `is-${props.direction}`]} style={ribbon.value}>
          <div class={`${prefixCls.value}-silk`} style={silkStyle.value}>
            {slots.default?.({})}
          </div>
        </div>
      );
    };
  },
});
