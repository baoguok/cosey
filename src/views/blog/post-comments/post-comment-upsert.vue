<template>
  <co-form-dialog v-bind="dialogProps" width="fit-content">
    <co-form v-bind="formProps" label-width="auto" width="md">
      <co-form-item
        v-model="model.content"
        prop="content"
        :label="t('post.content')"
        required
        field-type="textarea"
      />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useUpsert } from 'cosey/hooks';
import { usePostCommentsApi } from '@/api/blog';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { addPostComment, updatePostComment } = usePostCommentsApi();

interface Model {
  content?: string;
}

interface Row extends Model {
  id: number;
}

const model = reactive<Model>({
  content: undefined,
});

const editId = ref<number>();

const { dialogProps, formProps, expose } = useUpsert<Model, Row>(
  computed(() => ({
    stuffTitle: t('post.comment'),
    model,
    onEdit(row) {
      editId.value = row.id;
    },
    addFetch: () => addPostComment(model),
    editFetch: () => updatePostComment(editId.value!, model),
  })),
);

defineExpose(expose);
</script>
