import { ElButton, ElDivider, ElPopover, useLocale } from 'element-plus';
import { useEditor } from 'slate-vue3';
import { defineComponent, inject, PropType } from 'vue';
import { unwrapLink } from './plugins/link';
import { DOMEditor } from 'slate-vue3/dom';
import { Node } from 'slate-vue3/core';
import Icon from '../icon/icon.vue';
import { useComponentConfig } from '../config-provider';
import useStyle from './link-component.stye';
import { editorContextKey } from './editor-v2.api';

export const LinkComponent = defineComponent({
  props: {
    url: {
      type: String,
    },
    target: {
      type: String,
    },
    element: {
      type: Object as PropType<Node>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { t } = useLocale();
    const { prefixCls } = useComponentConfig('editor-link', props);
    const { hashId } = useStyle(prefixCls);

    const editor = useEditor();

    const onOpenLink = () => {
      window.open(props.url, '_blank');
    };

    const onRemoveLink = () => {
      unwrapLink(editor, DOMEditor.findPath(editor, props.element));
    };

    const editorContext = inject(editorContextKey)!;

    return () => {
      return (
        <ElPopover
          placement="bottom"
          trigger="click"
          popperClass={[hashId.value, `${prefixCls.value}-popper`]}
          appendTo={editorContext.popoverWrapper}
          v-slots={{
            reference: () => (
              <a href={props.url} target={props.target}>
                {slots.default?.()}
              </a>
            ),
            default: () => (
              <div class={[hashId.value, prefixCls.value]}>
                <ElButton type="primary" link onClick={onOpenLink}>
                  <Icon name="co:launch" class={`${prefixCls.value}-icon`} />
                  {t('co.editor.openLink')}
                </ElButton>
                <ElDivider direction="vertical" />
                <ElButton type="primary" link onClick={onRemoveLink}>
                  <Icon name="co:unlink" class={`${prefixCls.value}-icon`} />
                  {t('co.editor.removeLink')}
                </ElButton>
              </div>
            ),
          }}
        />
      );
    };
  },
});
