<template>
  <co-container full-page>
    <co-table v-bind="tableProps">
      <template #toolbar-left>
        <el-button v-if="can('create', 'blog_post')" type="primary" @click="upsert.add()">
          新增
        </el-button>
      </template>
      <template #action="{ row }">
        <co-table-action
          :actions="[
            {
              hidden: cannot('read', 'blog_comment'),
              label: '评论',
              icon: 'carbon:chat',
              onClick: () => {
                postComments?.open(row.id);
              },
            },
            {
              hidden: cannot('update', 'blog_post'),
              label: '编辑',
              icon: 'carbon:edit',
              onClick: () => {
                upsert.edit(row);
              },
            },
            {
              hidden: cannot('delete', 'blog_post'),
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

    <PostsUpsert :ref="upsert.ref" />

    <PostComments ref="postComments" />
  </co-container>
</template>

<script lang="tsx" setup>
import { ElMessage } from 'element-plus';
import { usePostsApi } from '@/api/blog';
import PostsUpsert from './post-upsert.vue';
import { useOuterUpsert } from 'cosey/hooks';
import { useTable } from 'cosey/components';
import PostComments from './post-comments.vue';
import { useTemplateRef } from 'vue';
import { useAbility } from '@casl/vue';

defineOptions({
  name: 'BlogPosts',
});

const { can, cannot } = useAbility();

const { getPosts, deletePost } = usePostsApi();

const [tableProps, { reload }] = useTable({
  api: getPosts,
  columns: [
    { prop: 'id', label: 'ID' },
    { prop: 'postType.name', label: '分类名称' },
    { prop: 'title', label: '标题' },
    { prop: 'digest', label: '摘要' },
    { prop: 'createdAt', label: '创建时间', renderer: 'datetime' },
    { prop: 'updatedAt', label: '更新时间', renderer: 'datetime' },
  ],
  actionColumn: {
    label: '操作',
    slots: 'action',
    fixed: 'right',
    minWidth: 200,
  },
  height: '100%',
  formProps: {
    schemes: [
      { prop: 'postTypeName', label: '分类名称' },
      { prop: 'title', label: '标题' },
    ],
  },
});

const upsert = useOuterUpsert({
  success() {
    reload();
  },
});

const onDelete = async (id: number) => {
  return deletePost(id).then(() => {
    ElMessage.success('删除成功');
    reload();
  });
};

const postComments = useTemplateRef('postComments');
</script>
