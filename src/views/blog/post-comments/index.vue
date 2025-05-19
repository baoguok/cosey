<template>
  <co-container full-page>
    <co-table v-bind="tableProps">
      <template #action="{ row }">
        <co-table-action
          :actions="[
            {
              hidden: cannot('update', 'blog_comment'),
              label: '编辑',
              icon: 'carbon:edit',
              onClick: () => {
                upsert.edit(row);
              },
            },
            {
              hidden: cannot('delete', 'blog_comment'),
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

    <PostCommentsUpsert :ref="upsert.ref" />
  </co-container>
</template>

<script lang="tsx" setup>
import PostCommentsUpsert from './post-comment-upsert.vue';
import { useOuterUpsert } from 'cosey/hooks';
import { useTable } from 'cosey/components';
import { usePostCommentsApi } from '@/api/blog';
import { ElMessage } from 'element-plus';
import { useAbility } from '@casl/vue';

defineOptions({
  name: 'BlogPostComments',
});

const { cannot } = useAbility();

const { getPostComments, deletePostComment } = usePostCommentsApi();

const [tableProps, { reload }] = useTable({
  api: getPostComments,
  columns: [
    { prop: 'id', label: 'ID' },
    { prop: 'user.nickname', label: '用户' },
    { prop: 'post.title', label: '文章' },
    { prop: 'content', label: '内容' },
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
  return deletePostComment(id).then(() => {
    ElMessage.success('删除成功');
    reload();
  });
};
</script>
