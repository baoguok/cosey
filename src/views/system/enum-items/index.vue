<template>
  <el-dialog
    v-model="visible"
    title="枚举项"
    :style="{ maxWidth: 'calc(100vw - 32px)' }"
    :width="1200"
  >
    <co-table v-bind="tableProps">
      <template #toolbar-left>
        <el-button v-if="can('create', 'system_enum_item')" type="primary" @click="upsert.add()">
          新增
        </el-button>
      </template>
      <template #action="{ row }">
        <co-table-action
          :actions="[
            {
              hidden: cannot('update', 'system_enum_item'),
              label: '编辑',
              icon: 'carbon:edit',
              onClick: () => {
                upsert.edit(row);
              },
            },
            {
              hidden: cannot('delete', 'system_enum_item'),
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

  <Upsert :ref="upsert.ref" />
</template>

<script lang="tsx" setup>
import { ElMessage } from 'element-plus';
import { useEnumsApi } from '@/api/system/enums';
import Upsert from './enum-item-upsert.vue';
import { useOuterUpsert } from 'cosey/hooks';
import { useTable } from 'cosey/components';
import { useRoute } from 'vue-router';
import { nextTick, ref } from 'vue';
import { useAbility } from '@casl/vue';

defineOptions({
  name: 'SystemEnumItems',
});

const { can, cannot } = useAbility();

const enumId = ref<number>();

const route = useRoute();

const { getEnumItems, deleteEnumItem } = useEnumsApi();

const [tableProps, { reload }] = useTable({
  api: (params) => getEnumItems(enumId.value!, params),
  columns: [
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '名称' },
    { prop: 'value', label: '值' },
    { prop: 'createdAt', label: '创建时间', renderer: 'datetime' },
    { prop: 'updatedAt', label: '更新时间', renderer: 'datetime' },
  ],
  actionColumn: {
    label: '操作',
    slots: 'action',
    fixed: 'right',
    minWidth: 280,
  },
  height: '100%',
  formProps: {
    schemes: [
      { prop: 'name', label: '名称' },
      { prop: 'value', label: '值' },
    ],
  },

  immediate: false,
});

const upsert = useOuterUpsert<object, number>({
  success() {
    reload();
  },
});

const onDelete = async (id: number) => {
  return deleteEnumItem(route.params.enumId as unknown as number, id).then(() => {
    ElMessage.success('删除成功');
    reload();
  });
};

const visible = ref(false);

defineExpose({
  open(id: number) {
    enumId.value = id;
    upsert.setData(id);
    visible.value = true;

    nextTick(() => {
      reload();
    });
  },
});
</script>
