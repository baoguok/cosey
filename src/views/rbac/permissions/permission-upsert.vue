<template>
  <co-form-dialog v-bind="dialogProps" width="fit-content">
    <co-form v-bind="formProps" label-width="auto" width="md">
      <co-form-item
        v-model="model.pid"
        prop="pid"
        label="父权限"
        field-type="treeselect"
        :field-props="{
          data: permissionTree,
          checkStrictly: true,
          nodeKey: 'id',
          props: {
            label: 'name',
          },
        }"
      />
      <co-form-item v-model="model.name" prop="name" label="名称" required />
      <co-form-item v-model="model.subject" prop="subject" label="资源" required />
      <co-form-item v-model="model.action" prop="action" label="动作" required />
      <co-form-item
        v-model="model.conditions"
        prop="conditions"
        label="条件"
        field-type="textarea"
        :field-props="{
          rows: 3,
        }"
      />
      <co-form-item v-model="model.order" prop="order" label="排序" field-type="number" required />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useFetch, useUpsert } from 'cosey/hooks';
import { usePermissionsApi } from '@/api/rbac/permissions';

const { addPermission, updatePermission, getPermissionParentTree, getPermissionTree } =
  usePermissionsApi();

const { data: permissionTree, execute } = useFetch<any[], { type: 'add' | 'edit'; row?: Row }>(
  ({ type, row }) => {
    if (type === 'edit') {
      return getPermissionParentTree(row!.id);
    }
    return getPermissionTree();
  },
  {
    immediate: false,
  },
);

interface Model {
  pid?: string | null;
  name?: string;
  subject?: string;
  action?: string;
  conditions?: string;
  order?: number;
}

interface Row extends Model {
  id: number;
}

const model = reactive<Model>({
  pid: undefined,
  name: undefined,
  subject: undefined,
  action: undefined,
  conditions: undefined,
  order: undefined,
});

const editId = ref<number>();

const { dialogProps, formProps, expose } = useUpsert<Model, Row>({
  stuffTitle: '权限',
  model,
  show(type, row) {
    execute({ type, row });
  },
  beforeFill(row) {
    editId.value = row.id;
  },
  beforeSubmit() {
    return {
      ...model,
      pid: model.pid || null,
    };
  },
  add: (data) => addPermission(data),
  edit: (data) => updatePermission(editId.value!, data),
});

defineExpose(expose);
</script>
