<template>
  <co-container full-page>
    <co-table v-bind="tableProps">
      <template #toolbar-left>
        <el-button v-if="can('create', 'rbac_user')" type="primary" @click="upsert.add()">
          新增
        </el-button>
      </template>
      <template #action="{ row }">
        <co-table-action
          :actions="[
            {
              hidden: cannot('update', 'rbac_user'),
              label: '编辑',
              icon: 'carbon:edit',
              onClick: () => {
                upsert.edit(row);
              },
            },
            {
              hidden: cannot('delete', 'rbac_user') || row.id === userStore.userInfo?.id,
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

    <AdminUpsert :ref="upsert.ref" />
  </co-container>
</template>

<script lang="tsx" setup>
import { ElMessage } from 'element-plus';
import { useAdminsApi } from '@/api/rbac/admins';
import AdminUpsert from './admin-upsert.vue';
import { useOuterUpsert } from 'cosey/hooks';
import { useUserStore } from 'cosey';
import { useTable } from 'cosey/components';
import { useAbility } from '@casl/vue';

defineOptions({
  name: 'RbacAdmins',
});

const { can, cannot } = useAbility();

const { getAdmins, deleteAdmin } = useAdminsApi();
const userStore = useUserStore();

const [tableProps, { reload }] = useTable({
  api: getAdmins,
  columns: [
    { prop: 'id', label: 'ID' },
    { prop: 'username', label: '用户名' },
    { prop: 'nickname', label: '昵称' },
    { prop: 'avatar', label: '头像', renderer: 'media' },
    {
      prop: 'roles',
      label: '角色',
      renderer: {
        type: 'tag',
        path: 'name',
      },
    },
    { prop: 'createdAt', label: '创建时间', renderer: 'datetime' },
    { prop: 'updatedAt', label: '更新时间', renderer: 'datetime' },
  ],
  actionColumn: {
    label: '操作',
    slots: 'action',
    fixed: 'right',
    minWidth: 140,
  },
  height: '100%',
});

const upsert = useOuterUpsert({
  success() {
    reload();
  },
});

const onDelete = async (id: number) => {
  return deleteAdmin(id).then(() => {
    ElMessage.success('删除成功');
    reload();
  });
};
</script>
