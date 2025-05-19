<template>
  <co-container full-page>
    <co-table v-bind="tableProps">
      <template #toolbar-left>
        <el-button v-if="can('create', 'blog_type')" type="primary" @click="upsert.add()">
          新增
        </el-button>
      </template>
      <template #action="{ row }">
        <co-table-action
          :actions="[
            {
              hidden: cannot('update', 'blog_type'),
              label: '编辑',
              icon: 'carbon:edit',
              onClick: () => {
                upsert.edit(row);
              },
            },
            {
              hidden: cannot('delete', 'blog_type'),
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

    <PosttypesUpsert :ref="upsert.ref" />
  </co-container>
</template>

<script lang="tsx" setup>
import PosttypesUpsert from './post-type-upsert.vue';
import { useOuterUpsert } from 'cosey/hooks';
import { useTable } from 'cosey/components';
import { usePosttypesApi } from '@/api/blog';
import { ElMessage } from 'element-plus';
import { useAbility } from '@casl/vue';

defineOptions({
  name: 'BlogPostTypes',
});

const { can, cannot } = useAbility();

const { getPosttypes, deletePosttype } = usePosttypesApi();

const [tableProps, { reload }] = useTable({
  api: getPosttypes,
  columns: [
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '分类名称' },
    { prop: 'description', label: '描述' },
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
  return deletePosttype(id).then(() => {
    ElMessage.success('删除成功');
    reload();
  });
};
</script>
