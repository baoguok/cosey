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
import { computed, reactive, ref } from 'vue';
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

const editId = ref<number>();

const { dialogProps, formProps, expose } = useUpsert<Model, Row>(
  computed(() => ({
    stuffTitle: t('post.articleCategory'),
    model,
    beforeFill(row) {
      editId.value = row.id;
    },
    add: () => addPosttype(model),
    edit: () => updatePosttype(editId.value!, model),
  })),
);

defineExpose(expose);
</script>
