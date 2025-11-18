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
import { computed, reactive } from 'vue';
import { useUpsert } from 'cosey/hooks';
import postCommentsApi from '@/api/blog';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { addPostComment, updatePostComment } = postCommentsApi;

interface Model {
  content?: string;
}

interface Row extends Model {
  id: number;
}

const model = reactive<Model>({
  content: undefined,
});

const { dialogProps, formProps, expose } = useUpsert<Model, Row>(
  computed(() => ({
    stuffTitle: t('post.comment'),
    model,
    addFetch: () => addPostComment(model),
    editFetch: (row) => updatePostComment(row.id, model),
  })),
);

defineExpose(expose);
</script>
