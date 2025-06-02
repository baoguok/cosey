<template>
  <co-container full-page>
    <co-table v-bind="tableProps">
      <template #toolbar-left>
        <el-button-group class="mr-4">
          <el-button @click="expandAll()">展开所有</el-button>
          <el-button @click="collapseAll()">折叠所有</el-button>
        </el-button-group>
        <el-button v-if="can('create', 'rbac_permission')" type="primary" @click="upsert.add()">
          新增
        </el-button>
      </template>
      <template #action="{ row }">
        <co-table-action
          :actions="[
            {
              hidden: cannot('update', 'rbac_permission'),
              label: '编辑',
              icon: 'carbon:edit',
              onClick: () => {
                upsert.edit(row);
              },
            },
            {
              hidden: cannot('delete', 'rbac_permission'),
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

    <PermissionUpsert :ref="upsert.ref" />
  </co-container>
</template>

<script lang="tsx" setup>
import PermissionUpsert from './permission-upsert.vue';
import { useOuterUpsert } from 'cosey/hooks';
import { useTable } from 'cosey/components';
import { ElMessage } from 'element-plus';
import { usePermissionsApi } from '@/api/rbac/permissions';
import { reactive } from 'vue';
import { useAbility } from '@casl/vue';

defineOptions({
  name: 'RbacPermissions',
});

const { can, cannot } = useAbility();

const { deletePermission, getPermissionTree } = usePermissionsApi();

const [tableProps, { reload, expandAll, collapseAll }] = useTable(
  reactive({
    api: getPermissionTree,
    keys: {
      list: '',
    },
    rowKey: 'id',
    columns: [
      { prop: 'name', label: '名称', minWidth: 200 },
      { prop: 'subject', label: '资源', minWidth: 180 },
      { prop: 'action', label: '动作' },
      { prop: 'conditions', label: '条件' },
      { prop: 'order', label: '排序' },
    ],
    actionColumn: {
      label: '操作',
      slots: 'action',
      fixed: 'right',
      minWidth: 140,
    },
    height: '100%',
    pagination: false,
  }),
);

const upsert = useOuterUpsert({
  success() {
    reload();
  },
});

const onDelete = async (id: number) => {
  return deletePermission(id).then(() => {
    ElMessage.success('删除成功');
    reload();
  });
};
</script>
