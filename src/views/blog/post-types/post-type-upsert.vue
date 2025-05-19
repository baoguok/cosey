<template>
  <co-form-dialog v-bind="dialogProps" width="fit-content">
    <co-form v-bind="formProps" label-width="auto" width="md">
      <co-form-item v-model="model.name" prop="name" label="分类名称" />
      <co-form-item
        v-model="model.description"
        prop="description"
        label="描述"
        field-type="textarea"
      />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useUpsert } from 'cosey/hooks';
import { usePosttypesApi } from '@/api/blog';

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

const { dialogProps, formProps, expose } = useUpsert<Model, Row>({
  stuffTitle: '文章分类',
  model,
  beforeFill(row) {
    editId.value = row.id;
  },
  add: () => addPosttype(model),
  edit: () => updatePosttype(editId.value!, model),
});

defineExpose(expose);
</script>
