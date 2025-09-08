import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';
import { useClipboard } from '@vueuse/core';
import { copyProps } from './copy.api';
import useStyle from './copy.style';
import { useComponentConfig } from '../config-provider';
import Icon from '../icon';

export default defineComponent({
  name: 'CoCopy',
  props: copyProps,
  setup(props) {
    const { prefixCls } = useComponentConfig('copy', props);

    const { hashId } = useStyle(prefixCls);

    const { copy, copied } = useClipboard();

    return () => {
      return (
        <ElButton
          link
          class={[hashId.value, prefixCls.value, { 'is-copied': copied.value }]}
          style={{ color: props.color }}
          onClick={() => copy(props.text || '')}
        >
          <Icon name={copied ? 'co:checkmark' : 'co:copy'} class={`${prefixCls.value}-icon`} />
        </ElButton>
      );
    };
  },
});
