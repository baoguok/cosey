<template>
  <el-dialog
    v-model="visible"
    title="评论"
    :style="{ maxWidth: 'calc(100vw - 32px)' }"
    :width="1200"
  >
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
  </el-dialog>

  <PostCommentsUpsert :ref="upsert.ref" />
</template>

<script lang="ts" setup>
import { useAbility } from '@casl/vue';
import PostCommentsUpsert from '../post-comments/post-comment-upsert.vue';
import { usePostCommentsApi } from '@/api/blog';
import { useTable } from 'cosey/components';
import { useOuterUpsert } from 'cosey/hooks';
import { ElMessage } from 'element-plus';
import { nextTick, ref } from 'vue';

const { cannot } = useAbility();

const postId = ref<number>();

const visible = ref(false);

const { getPostComments, deletePostComment } = usePostCommentsApi();

const [tableProps, { reload }] = useTable({
  api: getPostComments,
  columns: [
    { prop: 'id', label: 'ID' },
    { prop: 'user.nickname', label: '用户' },
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

  immediate: false,

  beforeFetch(params) {
    return {
      ...params,
      postId: postId.value,
    };
  },
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

defineExpose({
  open(id: number) {
    postId.value = id;
    visible.value = true;

    nextTick(() => {
      reload();
    });
  },
});
</script>
