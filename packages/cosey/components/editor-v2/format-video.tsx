import { computed, defineComponent, reactive, ref } from 'vue';
import { useEditor } from 'slate-vue3';
import { Element, Node, Path, Transforms } from 'slate-vue3/core';
import Icon from '../icon/icon.vue';
import Button from './button';
import FormDialog from '../form-dialog/form-dialog';
import Form from '../form/form';
import FormItem from '../form/form-item.vue';
import { useLocale } from '../../hooks';
import { Range } from 'slate-vue3/core';
import { VideoElement } from './types';
import { DOMEditor } from 'slate-vue3/dom';

function isVideoNode(node?: Node) {
  return Element.isElement(node) && node.type === 'video';
}

export default defineComponent({
  setup() {
    const { t } = useLocale();

    const editor = useEditor();

    const isActive = computed(() => {
      if (editor.selection && Range.isCollapsed(editor.selection)) {
        if (isVideoNode(Node.parent(editor, editor.node(editor.selection)[1]))) {
          return true;
        }
      }
      return false;
    });

    const onClick = () => {
      if (isActive.value) {
        const element = Node.parent(editor, editor.node(editor.selection!)[1]) as VideoElement;
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
        `${actionType.value === 'update' ? t('co.editor.edit') : t('co.editor.insert')}${t('co.editor.video')}`,
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
        Transforms.setNodes(
          editor,
          {
            ...model,
          },
          {
            at: Path.parent(editor.selection!.focus.path),
          },
        );
      } else {
        editor.insertVideo(model.url, model.width, model.height);
      }
    };

    return () => {
      return (
        <>
          <Button active={isActive.value} onClick={onClick}>
            <Icon name="co:video-player" />
          </Button>

          <FormDialog v-model={visible.value} title={title.value} width="sm">
            <Form model={model} labelWidth="auto" grid rowProps={{ gutter: 16 }} submit={onSubmit}>
              <FormItem v-model={model.url} prop="url" label="URL" field-type="input" />
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
