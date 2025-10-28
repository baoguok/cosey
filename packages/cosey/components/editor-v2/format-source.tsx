import { defineComponent, ref } from 'vue';
import { ElButton, ElDialog, ElInput } from 'element-plus';
import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button';
import { useLocale } from '../../hooks';
import { Selection } from 'slate-vue3/core';

export default defineComponent({
  setup() {
    const { t } = useLocale();

    const editor = useEditor();

    const visible = ref(false);
    const value = ref('');

    let selection: Selection;

    const onShow = () => {
      selection = editor.selection;
      value.value = editor.serialize() || '';
      visible.value = true;
    };

    const onCancel = () => {
      visible.value = false;
    };

    const onConfirm = () => {
      const fragment = editor.deserialize(value.value);

      editor.select([]);
      editor.delete();
      editor.insertFragment(fragment);
      if (selection) {
        editor.setSelection(selection);
      }

      visible.value = false;
    };

    return () => {
      return (
        <>
          <Button onClick={onShow}>
            <Icon name="co:repo-source-code" />
          </Button>
          <ElDialog
            title={t('co.editor.sourceCode')}
            v-model={visible.value}
            width="992px"
            style="max-width: calc(100vw - 32px)"
            v-slots={{
              default: () => <ElInput v-model={value.value} type="textarea" rows={26} />,
              footer: () => (
                <>
                  <ElButton onClick={onCancel}>{t('co.common.cancel')}</ElButton>
                  <ElButton type="primary" onClick={onConfirm}>
                    {t('co.common.confirm')}
                  </ElButton>
                </>
              ),
            }}
          ></ElDialog>
        </>
      );
    };
  },
});
