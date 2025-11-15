import { defineComponent } from 'vue';
import Icon from '../icon/icon';
import { useComponentConfig } from '../config-provider';
import { contextMenuContentProps } from './content.api';

export default defineComponent({
  props: contextMenuContentProps,
  setup(props, { attrs }) {
    const { prefixCls } = useComponentConfig('context-menu-content', props);

    return () => {
      return (
        <div
          ref="item"
          {...attrs}
          class={[
            prefixCls.value,
            {
              'is-disabled': props.disabled,
              'is-hover': props.hover,
            },
          ]}
        >
          {props.withIcon && (
            <div class={`${prefixCls.value}-icon`}>{props.icon && <Icon name={props.icon} />}</div>
          )}
          <span class={`${prefixCls.value}-title`}>{props.title}</span>
          <div class={`${prefixCls.value}-arrow`}>
            {props.arrow && (
              <Icon name="co:chevron-right" class={`${prefixCls.value}-arrow-icon`} size="lg" />
            )}
          </div>
        </div>
      );
    };
  },
});
