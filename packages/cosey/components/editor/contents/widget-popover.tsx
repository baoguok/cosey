import { defineComponent, inject } from 'vue';
import { ElPopover, popoverProps } from 'element-plus';
import { useComponentConfig } from '../../config-provider';
import useStyle from './widget-popover.style';
import { popoverContainerContextKey } from '../usePopoverContainer';

export default defineComponent({
  name: 'CoEditorWidgetPopover',
  props: popoverProps,
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('editor-widget-popover', props);
    const { hashId } = useStyle(prefixCls);

    const { popoverWrapper } = inject(popoverContainerContextKey)!;

    return () => {
      return (
        <ElPopover
          {...props}
          placement="bottom"
          trigger="click"
          popperClass={[hashId.value, `${prefixCls.value}-popper`]}
          appendTo={popoverWrapper}
          v-slots={{
            reference: () => slots.reference?.(),
            default: () => slots.default?.(),
          }}
        />
      );
    };
  },
});
