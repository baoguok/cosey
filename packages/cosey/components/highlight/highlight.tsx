import { computed, defineComponent } from 'vue';
import { ElScrollbar } from 'element-plus';
import { Prism, highlightProps, highlightSlots } from './highlight.api';
import useStyle, { useGlobalHighlightStyle } from './highlight.style';
import { useComponentConfig } from '../config-provider';
import Copy from '../copy/copy';

export default defineComponent({
  name: 'CoHighlight',
  props: highlightProps,
  slots: highlightSlots,
  setup(props) {
    const { prefixCls } = useComponentConfig('highlight', props);

    const { hashId } = useStyle(prefixCls);

    useGlobalHighlightStyle();

    const highlightedCode = computed(() =>
      Prism.highlight(
        props.code || '',
        Prism.languages[props.lang] || Prism.languages['text'],
        props.lang,
      ),
    );

    return () => {
      return (
        <div class={[hashId.value, prefixCls.value]}>
          <ElScrollbar
            tag="pre"
            class={`${prefixCls.value}-scroll`}
            view-class={`language-${props.lang}`}
            maxHeight={props.maxHeight}
          >
            <code class={`language-${props.lang}`} innerHTML={highlightedCode.value}></code>
          </ElScrollbar>
          <div class={`${prefixCls.value}-copy`}>
            <Copy text={props.code} class={`${prefixCls.value}-copy`} />
          </div>
        </div>
      );
    };
  },
});
