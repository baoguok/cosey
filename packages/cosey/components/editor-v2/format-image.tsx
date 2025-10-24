import { computed, defineComponent, reactive, ref } from 'vue';
import { useEditor } from 'slate-vue3';
import { Editor, Element } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';
import Icon from '../icon/icon.vue';
import Button from './button';
import FormDialog from '../form-dialog/form-dialog';
import Form from '../form/form';
import FormItem from '../form/form-item.vue';
import { useLocale } from 'element-plus';
import FormGroup from '../form-group/form-group';
import { chooseFiles } from '../../utils';

export default defineComponent({
  setup() {
    const { t } = useLocale();

    const editor = useEditor();

    const isImageActive = computed(() => {
      const [link] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === 'image',
      });
      return !!link;
    });

    const onClick = () => {
      chooseFiles({
        accept: 'image/*',
        multiple: false,
      }).then((files) => {
        DOMEditor.focus(editor);
        files.forEach((file) => {
          editor.insertImage('', file);
        });
      });
    };

    // form
    const visible = ref(false);

    const formModel = reactive({
      url: '',
      width: '',
      height: '',
    });

    const onSubmit = () => {
      if (!formModel.url.trim()) {
        return;
      }

      editor.insertImage(formModel.url, undefined, formModel.width, formModel.height);
    };

    return () => {
      return (
        <>
          <Button active={isImageActive.value} onClick={onClick}>
            <Icon name="co:image" />
          </Button>

          <FormDialog v-model={visible.value} title={t('co.editor.insertLink')} width="sm">
            <Form model={formModel} labelWidth="auto" submit={onSubmit}>
              <FormItem v-model={formModel.url} prop="url" label="URL" fieldType="input" />
              <FormGroup>
                <FormItem
                  v-model={formModel.width}
                  prop="text"
                  label={t('co.editor.width')}
                  fieldType="input"
                  width="xs"
                />
                <FormItem
                  v-model={formModel.height}
                  prop="target"
                  label={t('co.editor.height')}
                  fieldType="input"
                  width="xs"
                />
              </FormGroup>
            </Form>
          </FormDialog>
        </>
      );
    };
  },
});
