import { computed, defineComponent, reactive, ref } from 'vue';
import { useEditor } from 'slate-vue3';
import { Editor, Element, Node, Range } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';
import Icon from '../icon/icon.vue';
import Button from './button';
import FormDialog from '../form-dialog/form-dialog';
import Form from '../form/form';
import FormItem from '../form/form-item.vue';
import { useLocale } from '../../hooks';

export default defineComponent({
  setup() {
    const editor = useEditor();

    const isLinkActive = computed(() => {
      const [link] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === 'link',
      });
      return !!link;
    });

    const { t } = useLocale();

    const onClick = () => {
      DOMEditor.focus(editor);

      const [match] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === 'link',
      });
      if (match && Range.surrounds(editor.range(match[1]), editor.range(editor.selection!))) {
        editor.select(match[1]);

        const { url, target } = match[0];

        Object.assign(formModel, {
          url,
          target,
          text: Node.string(match[0]),
        });
      } else {
        Object.assign(formModel, {
          url: '',
          target: '_blank',
          text: editor.string(editor.selection!),
        });
      }

      visible.value = true;
    };

    // form
    const visible = ref(false);

    const formModel = reactive({
      url: '',
      text: '',
      target: '',
    });

    const targetOptions = [
      { label: t('co.editor.currentWindow'), value: '_self' },
      { label: t('co.editor.newWindow'), value: '_blank' },
    ];

    const onSubmit = () => {
      if (!formModel.url.trim() || !formModel.text.trim()) {
        return;
      }

      editor.formatLink(formModel.url, formModel.target, formModel.text);
    };

    return () => {
      return (
        <>
          <Button active={isLinkActive.value} onClick={onClick}>
            <Icon name="co:link" />
          </Button>

          <FormDialog v-model={visible.value} title={t('co.editor.insertLink')} width="sm">
            <Form model={formModel} label-width="auto" submit={onSubmit}>
              <FormItem v-model={formModel.url} prop="url" label="URL" fieldType="input" />
              <FormItem
                v-model={formModel.text}
                prop="text"
                label={t('co.editor.displayedText')}
                fieldType="input"
              />
              <FormItem
                v-model={formModel.target}
                prop="target"
                label={t('co.editor.openLinkAt')}
                fieldType="select"
                fieldProps={{
                  options: targetOptions,
                }}
              />
            </Form>
          </FormDialog>
        </>
      );
    };
  },
});
