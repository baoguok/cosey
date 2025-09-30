import { computed, defineComponent, Transition } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { transitionProps, transitionSlots } from './transition.api';
import { useComponentConfig } from '../config-provider';
import useStyle from './transition.style';

export default defineComponent({
  name: 'CoTransition',
  props: transitionProps,
  slots: transitionSlots,
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('transition');

    const { hashId } = useStyle(prefixCls);

    const vueTransProps = reactiveOmit(props, 'name');

    const mergedProps = computed(() => {
      const transitionName = `${hashId.value} ${prefixCls.value}-${props.name}`;
      return {
        ...vueTransProps,
        enterFromClass: `${transitionName}-enter-from`,
        enterActiveClass: `${transitionName}-enter-active`,
        enterToClass: `${transitionName}-enter-to`,
        leaveFromClass: `${transitionName}-leave-from`,
        leaveActiveClass: `${transitionName}-leave-active`,
        leaveToClass: `${transitionName}-leave-to`,
      };
    });

    return () => {
      return <Transition {...mergedProps.value} v-slots={slots}></Transition>;
    };
  },
});
