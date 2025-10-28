import { useEditor, useElement } from 'slate-vue3';
import { Range } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';
import { computed, defineComponent, type PropType } from 'vue';
import { useComponentConfig } from '../config-provider';
import useStyle from './image-component.style';
import Resize from './resize';
import Upload from './upload';
import { useObjectUrl } from '../../hooks';

export const ImageComponent = defineComponent({
  props: {
    url: {
      type: String,
    },
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },
    file: {
      type: Object as PropType<File>,
    },
  },
  setup(props, { slots }) {
    const { prefixCls } = useComponentConfig('editor-v2-image', props);
    const { hashId } = useStyle(prefixCls);

    const editor = useEditor();

    const element = useElement();

    const objectUrl = useObjectUrl(() => props.file);
    const mergedUrl = computed(() => props.url || objectUrl.value);

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

    // upload
    const onSuccess = (url: string) => {
      editor.setNodes(
        {
          url,
          file: undefined,
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
            <img src={mergedUrl.value} width={props.width} height={props.height} />
            <Resize visible={isActive.value} onResize={onResize} />
            {props.file && <Upload file={props.file} onSuccess={onSuccess} />}
          </div>
          {slots.default?.()}
        </div>
      );
    };
  },
});
