<template>
  <co-container full-page>
    <co-table v-bind="tableProps">
      <template #toolbar-left>
        <el-button v-if="can('create', 'user')" type="primary" @click="upsert.add()">
          新增
        </el-button>
        <el-button
          v-if="can('update', 'user')"
          type="primary"
          @click="onBatchSilent('确定禁言？', 1)"
        >
          批量禁言
        </el-button>
        <el-button
          v-if="can('update', 'user')"
          type="primary"
          @click="onBatchSilent('确定取消禁言？', 0)"
        >
          批量取消禁言
        </el-button>
      </template>
      <template #action="{ row }">
        <co-table-action
          :actions="[
            {
              hidden: cannot('update', 'user'),
              label: '编辑',
              icon: 'carbon:edit',
              onClick: () => {
                upsert.edit(row);
              },
            },
            {
              hidden: cannot('delete', 'user'),
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

    <UserUpsert :ref="upsert.ref" />
  </co-container>
</template>

<script lang="tsx" setup>
import { ElMessage } from 'element-plus';
import { useUsersApi } from '@/api/users';
import UserUpsert from './user-upsert.vue';
import { useOuterUpsert } from 'cosey/hooks';
import { useTable } from 'cosey/components';
import * as mock from '@gunny/mock';
import { useAbility } from '@casl/vue';
import { warningConfirm } from 'cosey/utils';

defineOptions({
  name: 'Users',
});

const { can, cannot } = useAbility();

const { getUsers, deleteUser, updateUser, updateBulkSilent } = useUsersApi();

const [tableProps, { reload, getSelectionRows }] = useTable({
  api: getUsers,
  columns: [
    {
      type: 'selection',
    },
    { prop: 'id', label: 'ID' },
    { prop: 'nickname', label: '昵称' },
    {
      label: '联系方式',
      columns: [
        { prop: 'name', label: '姓名' },
        { prop: 'mobile', label: '手机号' },
        { prop: 'address', label: '地址', renderer: 'longtext', minWidth: 120 },
      ],
    },
    { prop: 'gender', label: '性别' },
    {
      prop: 'silent',
      label: '禁言',
      renderer: {
        type: 'switch',
        api: (value, row) => updateUser(row.id, { silent: value }),
        props: { activeValue: 1, inactiveValue: 0 },
      },
    },
    { prop: 'birthday', label: '生日', renderer: 'date', sortable: 'custom' },
    { prop: 'constellation', label: '星座' },
    { prop: 'height', label: '身高(cm)', sortable: 'custom' },
    { prop: 'weight', label: '体重(kg)', sortable: 'custom' },
    { prop: 'avatar', label: '头像', renderer: 'media' },
    { prop: 'qualification', label: '学历' },
    { prop: 'trait', label: '特质' },
    { prop: 'friendshipType', label: '交友类型' },
    { prop: 'hobbies', label: '爱好', renderer: 'tag' },
    { prop: 'signature', label: '个性签名' },
    { prop: 'createdAt', label: '创建时间', renderer: 'datetime' },
    { prop: 'updatedAt', label: '更新时间', renderer: 'datetime' },
  ],
  actionColumn: {
    label: '操作',
    slots: 'action',
    fixed: 'right',
    minWidth: 150,
  },
  height: '100%',
  formProps: {
    schemes: [
      { prop: 'nickname', label: '昵称' },
      { prop: 'mobile', label: '手机号' },
      { prop: 'name', label: '姓名' },
      {
        prop: 'gender',
        label: '性别',
        fieldType: 'select',
        fieldProps: { options: mock.genders },
      },
      { prop: 'birthday', label: '生日', fieldType: 'daterange' },
      {
        prop: 'silent',
        label: '禁言',
        fieldType: 'select',
        fieldProps: {
          options: [
            { label: '是', value: 1 },
            { label: '否', value: 0 },
          ],
        },
      },
    ],
  },
});

const upsert = useOuterUpsert({
  success() {
    reload();
  },
});

const onDelete = async (id: number) => {
  return deleteUser(id).then(() => {
    ElMessage.success('删除成功');
    reload();
  });
};

const onBatchSilent = (message: string, value: number) => {
  const ids = getSelectionRows().map((item: any) => item.id);
  if (ids.length === 0) {
    ElMessage('请勾选');
  } else {
    warningConfirm(message).then(() =>
      updateBulkSilent({
        ids,
        value,
      }).then(() => {
        ElMessage.success('操作成功');
        reload();
      }),
    );
  }
};
</script>
