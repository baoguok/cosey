import { defineComponent, inject } from 'vue';
import { ElPopover, popoverProps } from 'element-plus';
import { editorContextKey } from '../editor-v2.api';
import { useComponentConfig } from '../../config-provider';
import useStyle from './widget-popover.style';

export default defineComponent({
  props: popoverProps,
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('editor-v2-widget-popover', props);
    const { hashId } = useStyle(prefixCls);

    const editorContext = inject(editorContextKey)!;

    return () => {
      return (
        <ElPopover
          {...props}
          placement="bottom"
          trigger="click"
          popperClass={[hashId.value, `${prefixCls.value}-popper`]}
          appendTo={editorContext.popoverWrapper}
          v-slots={{
            reference: () => slots.reference?.(),
            default: () => slots.default?.(),
          }}
        />
      );
    };
  },
});
