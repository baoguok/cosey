<template>
  <co-form-dialog v-bind="dialogProps" width="fit-content">
    <co-form v-bind="formProps" label-width="auto" width="md">
      <co-form-item v-model="model.name" prop="name" label="角色名" required />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useUpsert } from 'cosey/hooks';
import { useRolesApi } from '@/api/rbac/roles';

const { addRole, updateRole } = useRolesApi();

interface Model {
  name?: string;
}

interface Row extends Omit<Model, 'roles'> {
  id: number;
}

const model = reactive<Model>({
  name: undefined,
});

const editId = ref<number>();

const { dialogProps, formProps, expose } = useUpsert<Model, Row>({
  stuffTitle: '角色',
  model,
  beforeFill(row) {
    editId.value = row.id;
  },
  add: () => addRole(model),
  edit: () => updateRole(editId.value!, model),
});

defineExpose(expose);
</script>
