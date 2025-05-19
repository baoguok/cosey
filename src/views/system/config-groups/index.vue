<template>
  <el-dialog
    v-model="visible"
    title="枚举项"
    :style="{ maxWidth: 'calc(100vw - 32px)' }"
    :width="1200"
  >
    <co-table v-bind="tableProps">
      <template #toolbar-left>
        <el-button v-if="can('create', 'system_config_group')" type="primary" @click="upsert.add()">
          新增
        </el-button>
      </template>
      <template #action="{ row }">
        <co-table-action
          :actions="[
            {
              hidden: cannot('update', 'system_config_group'),
              label: '编辑',
              icon: 'carbon:edit',
              onClick: () => {
                upsert.edit(row);
              },
            },
            {
              hidden: cannot('delete', 'system_config_group'),
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
  </el-dialog>

  <ConfigGroupUpsert :ref="upsert.ref" />
</template>

<script lang="tsx" setup>
import { ElMessage } from 'element-plus';
import { useConfigGroupsApi } from '@/api/system/configs';
import ConfigGroupUpsert from './config-group-upsert.vue';
import { useOuterUpsert } from 'cosey/hooks';
import { useTable } from 'cosey/components';
import { nextTick, ref } from 'vue';
import { useAbility } from '@casl/vue';

defineOptions({
  name: 'SystemConfigGroups',
});

const { can, cannot } = useAbility();

const { getConfigGroups, deleteConfigGroup } = useConfigGroupsApi();

const [tableProps, { reload }] = useTable({
  api: getConfigGroups,
  columns: [
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '名称' },
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
    schemes: [{ prop: 'name', label: '名称' }],
  },

  immediate: false,
});

const upsert = useOuterUpsert({
  success() {
    reload();
  },
});

const onDelete = async (id: number) => {
  return deleteConfigGroup(id).then(() => {
    ElMessage.success('删除成功');
    reload();
  });
};

const visible = ref(false);

defineExpose({
  open() {
    visible.value = true;
    nextTick(() => {
      reload();
    });
  },
});
</script>
