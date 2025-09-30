<template>
  <co-form-dialog v-bind="dialogProps" width="fit-content">
    <co-form v-bind="formProps" label-width="auto" width="md">
      <co-form-item v-model="model.name" prop="name" :label="t('post.categoryName')" required />
      <co-form-item
        v-model="model.description"
        prop="description"
        :label="t('post.description')"
        field-type="textarea"
        required
      />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useUpsert } from 'cosey/hooks';
import { usePosttypesApi } from '@/api/blog';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { addPosttype, updatePosttype } = usePosttypesApi();

interface Model {
  name?: string;
  description?: string;
}

interface Row extends Model {
  id: number;
}

const model = reactive<Model>({
  name: undefined,
  description: undefined,
});

const { dialogProps, formProps, expose } = useUpsert<Model, Row>(
  computed(() => ({
    stuffTitle: t('post.articleCategory'),
    model,
    addFetch: () => addPosttype(model),
    editFetch: (row) => updatePosttype(row.id, model),
  })),
);

defineExpose(expose);
</script>
