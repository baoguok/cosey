<template>
  <co-form-dialog v-bind="dialogProps" width="fit-content">
    <co-form v-bind="formProps" label-width="auto" width="md">
      <co-form-item
        v-model="model.content"
        prop="content"
        label="内容"
        required
        field-type="textarea"
      />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useUpsert } from 'cosey/hooks';
import { usePostCommentsApi } from '@/api/blog';

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

const { dialogProps, formProps, expose } = useUpsert<Model, Row>({
  stuffTitle: '评论',
  model,
  beforeFill(row) {
    editId.value = row.id;
  },
  add: () => addPostComment(model),
  edit: () => updatePostComment(editId.value!, model),
});

defineExpose(expose);
</script>
