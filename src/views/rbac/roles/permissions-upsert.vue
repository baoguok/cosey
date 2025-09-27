<template>
  <co-form-dialog v-bind="dialogProps" width="lg">
    <co-form v-bind="formProps">
      <co-form-item prop="permissionIds">
        <co-horizontal-tree
          ref="tree"
          v-loading="isFetching"
          show-checkbox
          node-key="id"
          :data="permissionTree"
          :props="{
            children: 'children',
            label: 'name',
          }"
        >
          <template #node="{ node }">
            {{ node.data.name }}
          </template>
        </co-horizontal-tree>
      </co-form-item>
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { usePermissionsApi } from '@/api/rbac/permissions';
import { useRolesApi } from '@/api/rbac/roles';
import { useFetch, useUpsert } from 'cosey/hooks';
import { computed, nextTick, reactive, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { getPermissionTree } = usePermissionsApi();
const { getRolePermissions, updateRolePermissions } = useRolesApi();

const treeRef = useTemplateRef('tree');

interface Model {
  permissionIds: number[];
}

const model = reactive<Model>({
  permissionIds: [],
});

const { dialogProps, formProps, expose } = useUpsert<Model, { id: number }>(
  computed(() => ({
    stuffTitle: t('rbac.permission'),
    model,
    detailsFetch(row) {
      execute(row.id);
    },
    editFetch: (row) =>
      updateRolePermissions(row.id, {
        permissionIds: treeRef.value?.getCheckedKeys(),
      }),
  })),
);

defineExpose(expose);

const permissionTree = ref();

const { isFetching, execute } = useFetch<Record<PropertyKey, any>[][]>(
  async (id) => {
    const [permTree, rolePermissions] = await Promise.all([
      getPermissionTree(),
      getRolePermissions(id),
    ]);

    permissionTree.value = permTree;
    nextTick(() => {
      treeRef.value?.setCheckedKeys(rolePermissions);
    });
  },
  {
    immediate: false,
  },
);
</script>
