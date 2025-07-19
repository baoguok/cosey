<template>
  <Button @click="onShow">
    <Icon name="co:repo-source-code" />
  </Button>

  <ElDialog
    :title="t('co.editor.sourceCode')"
    v-model="visible"
    width="992px"
    style="max-width: calc(100vw - 32px)"
  >
    <ElInput v-model="value" type="textarea" :rows="26" />
    <template #footer>
      <ElButton @click="onCancel">{{ t('co.common.cancel') }}</ElButton>
      <ElButton type="primary" @click="onConfirm">{{ t('co.common.confirm') }}</ElButton>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
import { toolbarContextKey } from '../toolbarContext';
import Button from '../../button.vue';
import { ElDialog, ElInput, ElButton } from 'element-plus';
import Icon from '../../../../icon';
import { useLocale } from '../../../../../hooks';

const { t } = useLocale();

const { quill } = inject(toolbarContextKey)!;

const visible = ref(false);
const value = ref('');

const onShow = () => {
  value.value = quill.value?.getSemanticHTML() || '';
  visible.value = true;
};

const onCancel = () => {
  visible.value = false;
};

const onConfirm = () => {
  quill.value?.clipboard.dangerouslyPasteHTML(value.value);
  visible.value = false;
};
</script>
