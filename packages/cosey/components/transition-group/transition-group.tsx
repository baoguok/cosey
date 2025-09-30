import { computed, defineComponent, TransitionGroup } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { transitionGroupProps, transitionGroupSlots } from './transition-group.api';
import useStyle from './transition-group.style';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoTransitionGroup',
  inheritAttrs: false,
  props: transitionGroupProps,
  slots: transitionGroupSlots,
  setup(props, { slots }) {
    const vueTransGroupProps = reactiveOmit(props, 'effect');

    const { prefixCls } = useComponentConfig('transition-group');

    const { hashId } = useStyle(prefixCls);

    const mergedProps = computed(() => {
      const transitionName = `${hashId.value} ${prefixCls.value}-${props.effect}`;
      return {
        ...vueTransGroupProps,
        moveClass: `${transitionName}-move`,
        enterFromClass: `${transitionName}-enter-from`,
        enterActiveClass: `${transitionName}-enter-active`,
        enterToClass: `${transitionName}-enter-to`,
        leaveFromClass: `${transitionName}-leave-from`,
        leaveActiveClass: `${transitionName}-leave-active`,
        leaveToClass: `${transitionName}-leave-to`,
      };
    });

    const onBeforeLeave = (el: Element) => {
      const node = el as HTMLElement;
      const rect = node.getBoundingClientRect();
      node.style.setProperty('position', 'fixed');
      node.style.setProperty('top', rect.top + 'px');
      node.style.setProperty('left', rect.left + 'px');
      node.style.setProperty('opacity', '0');
    };

    return () => {
      return (
        <TransitionGroup
          {...mergedProps.value}
          onBeforeLeave={onBeforeLeave}
          v-slots={slots}
        ></TransitionGroup>
      );
    };
  },
});
