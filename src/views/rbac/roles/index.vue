<template>
  <co-container full-page>
    <co-table v-bind="tableProps">
      <template #toolbar-left>
        <el-button v-if="can('create', 'rbac_role')" type="primary" @click="roleUpsert.add()">
          新增
        </el-button>
      </template>
      <template #action="{ row }">
        <co-table-action
          :actions="[
            {
              hidden: cannot('update', 'rbac_role'),
              label: '权限',
              icon: 'carbon:rule-draft',
              onClick: () => {
                permissionsUpsert.edit(row);
              },
            },
            {
              hidden: cannot('update', 'rbac_role'),
              label: '编辑',
              icon: 'carbon:edit',
              onClick: () => {
                roleUpsert.edit(row);
              },
            },
            {
              hidden: cannot('delete', 'rbac_role'),
              label: '删除',
              icon: 'carbon:trash-can',
              type: 'danger',
              popconfirm: {
                title: '确定删除？',
                confirm: () => onDelete(row.id),
              },
            },
          ]"
        />
      </template>
    </co-table>

    <RoleUpsert :ref="roleUpsert.ref" />
    <PermissionsUpsert :ref="permissionsUpsert.ref" />
  </co-container>
</template>

<script lang="tsx" setup>
import { ElMessage } from 'element-plus';
import { useRolesApi } from '@/api/rbac/roles';
import { useOuterUpsert } from 'cosey/hooks';
import { useTable } from 'cosey/components';
import PermissionsUpsert from './permissions-upsert.vue';
import RoleUpsert from './role-upsert.vue';
import { useAbility } from '@casl/vue';

defineOptions({
  name: 'RbacRoles',
});

const { can, cannot } = useAbility();

const { deleteRole, getRoles } = useRolesApi();

const [tableProps, { reload }] = useTable({
  api: getRoles,
  columns: [
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '角色名' },
    { prop: 'createdAt', label: '创建时间', renderer: 'datetime' },
    { prop: 'updatedAt', label: '更新时间', renderer: 'datetime' },
  ],
  actionColumn: {
    label: '操作',
    slots: 'action',
    minWidth: 200,
    fixed: 'right',
  },
  height: '100%',
});

const roleUpsert = useOuterUpsert({
  success() {
    reload();
  },
});

const permissionsUpsert = useOuterUpsert({
  success() {
    reload();
  },
});

const onDelete = async (id: number) => {
  return deleteRole(id).then(() => {
    ElMessage.success('删除成功');
    reload();
  });
};
</script>
