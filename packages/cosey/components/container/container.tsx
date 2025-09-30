import { computed, defineComponent, inject } from 'vue';
import { containerProps, containerSlots, containerContextKey } from './container.api';
import { useComponentConfig } from '../config-provider';
import useStyle from './container.style';

export default defineComponent({
  name: 'CoContainer',
  props: containerProps,
  slots: containerSlots,
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('container', props);

    const { hashId } = useStyle(prefixCls);

    const context = inject(containerContextKey, null);

    const height = computed(() => {
      return props.fullPage ? context?.height || '100vh' : undefined;
    });

    return () => {
      return (
        <div
          class={[hashId.value, prefixCls.value]}
          style={{
            height: height.value,
          }}
        >
          {slots.default?.({})}
        </div>
      );
    };
  },
});
