import { computed, defineComponent } from 'vue';
import { useComponentConfig } from '../config-provider';
import useStyle from './video-component.style';
import { useEditor, useElement } from 'slate-vue3';
import { Range } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';
import Resize from './resize';

export const VideoComponent = defineComponent({
  props: {
    url: {
      type: String,
    },
    width: {
      type: [String, Number],
      default: 300,
    },
    height: {
      type: [String, Number],
    },
  },
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('editor-v2-image', props);
    const { hashId } = useStyle(prefixCls);

    const editor = useEditor();

    const element = useElement();

    const isActive = computed(() => {
      return !!(
        editor.selection &&
        Range.isCollapsed(editor.selection) &&
        Range.surrounds(editor.range(DOMEditor.findPath(editor, element.value)), editor.selection)
      );
    });

    const onClick = () => {
      editor.select(DOMEditor.findPath(editor, element.value));
    };

    // resize
    const onResize = ({ width, height }: { width: number; height: number }) => {
      editor.setNodes(
        {
          width,
          height,
        },
        {
          at: DOMEditor.findPath(editor, element.value),
        },
      );
    };

    return () => {
      return (
        <div
          class={[
            hashId.value,
            prefixCls.value,
            {
              'is-active': isActive.value,
            },
          ]}
          onClick={onClick}
        >
          <div class={[`${prefixCls.value}-wrapper`]} contenteditable={false}>
            <video src={props.url} width={props.width} height={props.height} controls />
            <Resize visible={isActive.value} onResize={onResize} />
          </div>
          {slots.default?.()}
        </div>
      );
    };
  },
});
