import { computed, defineComponent, reactive, ref } from 'vue';
import { useEditor } from 'slate-vue3';
import { Element, Path } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';
import Icon from '../../icon/icon';
import Button from '../button';
import { chooseFiles } from '../../../utils';
import FormDialog from '../../form-dialog/form-dialog';
import Form from '../../form/form';
import FormItem from '../../form/form-item.vue';
import { useLocale } from '../../../hooks';
import { ElButton } from 'element-plus';
import { Node } from 'slate-vue3/core';
import { type ImageElement } from '../types';

export default defineComponent({
  setup() {
    const { t } = useLocale();

    const editor = useEditor();

    const isActive = computed(() => {
      const [link] = editor.nodes({
        match: (n) => Element.isElement(n) && n.type === 'image',
      });
      return !!link;
    });

    const onSelect = () => {
      visible.value = false;

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

    const onClick = () => {
      if (isActive.value) {
        const element = Node.parent(editor, editor.node(editor.selection!)[1]) as ImageElement;
        Object.assign(model, {
          url: element.url,
          width: element.width,
          height: element.height,
        });
        actionType.value = 'update';
      } else {
        actionType.value = 'insert';
      }

      visible.value = true;
    };

    // form
    const visible = ref(false);

    const actionType = ref<'update' | 'insert'>('insert');

    const title = computed(
      () =>
        `${actionType.value === 'update' ? t('co.editor.edit') : t('co.editor.insert')}${t('co.editor.image')}`,
    );

    const model = reactive({
      url: '',
      width: '',
      height: '',
    });

    const onSubmit = () => {
      if (!model.url.trim()) {
        return;
      }

      if (actionType.value === 'update') {
        DOMEditor.focus(editor);
        editor.setNodes(
          {
            ...model,
          },
          {
            at: Path.parent(editor.selection!.focus.path),
          },
        );
      } else {
        editor.insertImage(model.url, undefined, model.width, model.height);
      }
    };

    return () => {
      return (
        <>
          <Button active={isActive.value} onClick={onClick}>
            <Icon name="co:image" />
          </Button>

          <FormDialog v-model={visible.value} title={title.value} width="sm">
            <Form model={model} labelWidth="auto" grid rowProps={{ gutter: 16 }} submit={onSubmit}>
              <FormItem
                v-model={model.url}
                prop="url"
                label="URL"
                field-type="input"
                colProps={{ span: 20 }}
              />
              <ElButton text onClick={onSelect}>
                <Icon name="co:upload" />
              </ElButton>
              <FormItem
                v-model={model.width}
                prop="width"
                label={t('co.editor.width')}
                field-type="input"
                colProps={{ span: 12 }}
              />
              <FormItem
                v-model={model.height}
                prop="height"
                label={t('co.editor.height')}
                field-type="input"
                colProps={{ span: 12 }}
              />
            </Form>
          </FormDialog>
        </>
      );
    };
  },
});
