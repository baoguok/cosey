<template>
  <co-form-dialog v-bind="dialogProps">
    <co-form v-bind="formProps" label-width="auto" width="sm">
      <co-form-item v-model="model.name" prop="name" label="名称" required />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useConfigGroupsApi } from '@/api/system/configs';
import { useUpsert } from 'cosey/hooks';

const { addConfigGroup, updateConfigGroup } = useConfigGroupsApi();

interface Model {
  name?: string;
}

interface Row extends Model {
  id: number;
}

const model = reactive<Model>({
  name: undefined,
});

const editId = ref<number>();

const { dialogProps, formProps, expose } = useUpsert<Model, Row>({
  stuffTitle: '配置',
  model,
  beforeFill(row) {
    editId.value = row.id;
  },
  add: () => addConfigGroup(model),
  edit: () => updateConfigGroup(editId.value!, model),
});

defineExpose(expose);
</script>
