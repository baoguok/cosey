<template>
  <co-form-dialog v-bind="dialogProps" width="fit-content">
    <co-form v-bind="formProps" label-width="auto" width="md">
      <co-form-item
        v-model="model.pid"
        prop="pid"
        :label="t('rbac.parentPermission')"
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
      <co-form-item v-model="model.name" prop="name" :label="t('rbac.name')" required />
      <co-form-item v-model="model.subject" prop="subject" :label="t('rbac.resource')" required />
      <co-form-item v-model="model.action" prop="action" :label="t('rbac.action')" required />
      <co-form-item
        v-model="model.conditions"
        prop="conditions"
        :label="t('rbac.condition')"
        field-type="textarea"
        :field-props="{
          rows: 3,
        }"
      />
      <co-form-item
        v-model="model.order"
        prop="order"
        :label="t('common.sort')"
        field-type="number"
        required
      />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useFetch, useUpsert } from 'cosey/hooks';
import { usePermissionsApi } from '@/api/rbac/permissions';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

const { dialogProps, formProps, expose } = useUpsert<Model, Row>(
  computed(() => ({
    stuffTitle: t('rbac.permission'),
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
  })),
);

defineExpose(expose);
</script>
