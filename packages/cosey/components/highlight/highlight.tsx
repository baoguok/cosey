import { computed, defineComponent } from 'vue';
import { hljs, highlightProps, highlightSlots } from './highlight.api';
import useStyle from './highlight.style';
import { useComponentConfig } from '../config-provider';
import Copy from '../copy/copy';

export default defineComponent({
  name: 'CoHighlight',
  props: highlightProps,
  slots: highlightSlots,
  setup(props) {
    const { prefixCls } = useComponentConfig('highlight', props);

    const { hashId } = useStyle(prefixCls);

    const highlightedCode = computed(
      () =>
        hljs.highlight(props.code || '', {
          language: props.lang || 'txt',
        }).value,
    );

    return () => {
      return (
        <div class={[hashId.value, prefixCls.value]}>
          <pre>
            <code class="hljs" innerHTML={highlightedCode.value}></code>
          </pre>
          <div class={`${prefixCls.value}-copy`}>
            <Copy text={props.code} class={`${prefixCls.value}-copy`} />
          </div>
        </div>
      );
    };
  },
});
