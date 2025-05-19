<template>
  <co-container full-page>
    <co-table v-bind="tableProps">
      <template #toolbar-left>
        <el-button v-if="can('create', 'system_enum')" type="primary" @click="upsert.add()">
          新增
        </el-button>
      </template>
      <template #action="{ row }">
        <co-table-action
          :actions="[
            {
              hidden: cannot('read', 'system_enum_item'),
              label: '枚举项',
              icon: 'carbon:list',
              onClick: () => {
                enumItemsRef?.open(row.id);
              },
            },
            {
              hidden: cannot('update', 'system_enum'),
              label: '编辑',
              icon: 'carbon:edit',
              onClick: () => {
                upsert.edit(row);
              },
            },
            {
              hidden: cannot('delete', 'system_enum'),
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

    <Upsert :ref="upsert.ref" />

    <EnumItems ref="enumItems" />
  </co-container>
</template>

<script lang="tsx" setup>
import { ElMessage } from 'element-plus';
import { useEnumsApi } from '@/api/system/enums';
import Upsert from './enum-upsert.vue';
import { useOuterUpsert } from 'cosey/hooks';
import { useTable } from 'cosey/components';
import EnumItems from '../enum-items/index.vue';
import { useTemplateRef } from 'vue';
import { useAbility } from '@casl/vue';

defineOptions({
  name: 'SystemEnums',
});

const { can, cannot } = useAbility();

const { getEnums, deleteEnum } = useEnumsApi();

const [tableProps, { reload }] = useTable({
  api: getEnums,
  columns: [
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '名称' },
    { prop: 'remark', label: '备注' },
    { prop: 'createdAt', label: '创建时间', renderer: 'datetime' },
    { prop: 'updatedAt', label: '更新时间', renderer: 'datetime' },
  ],
  actionColumn: {
    label: '操作',
    slots: 'action',
    fixed: 'right',
    minWidth: 220,
  },
  height: '100%',
  formProps: {
    schemes: [
      { prop: 'name', label: '名称' },
      { prop: 'remark', label: '备注' },
    ],
  },
});

const upsert = useOuterUpsert({
  success() {
    reload();
  },
});

const onDelete = async (id: number) => {
  return deleteEnum(id).then(() => {
    ElMessage.success('删除成功');
    reload();
  });
};

const enumItemsRef = useTemplateRef('enumItems');
</script>
