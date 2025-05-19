<template>
  <co-form-dialog v-bind="dialogProps" width="lg" :before-close="onBeforeClose">
    <co-form v-bind="formProps" label-width="auto">
      <co-form-item
        v-model="model.postTypeId"
        prop="postTypeId"
        label="分类"
        required
        field-type="select"
        :field-props="{
          options: postTypes,
          labelKey: 'name',
          valueKey: 'id',
        }"
      />
      <co-form-item v-model="model.title" prop="title" label="标题" required />
      <co-form-item
        v-model="model.digest"
        prop="digest"
        label="摘要"
        required
        field-type="textarea"
        :field-props="{
          rows: 2,
        }"
      />
      <co-form-item prop="content" label="内容" required>
        <co-editor v-model="model.content" height="400px" />
      </co-form-item>
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useUpsert } from 'cosey/hooks';
import { usePostsApi, usePosttypesApi } from '@/api/blog';
import { ElMessageBox } from 'element-plus';

const { addPost, updatePost, getPost } = usePostsApi();

interface Model {
  postTypeId?: string;
  title?: string;
  digest?: string;
  content?: string;
}

interface Row extends Model {
  id: number;
}

const postTypes = ref<
  {
    id: number;
    name: string;
  }[]
>([]);

const model = reactive<Model>({
  postTypeId: undefined,
  title: undefined,
  digest: undefined,
  content: undefined,
});

const editId = ref<number>();

const { getPosttypes } = usePosttypesApi();

const { dialogProps, formProps, expose } = useUpsert<Model, Row>({
  stuffTitle: '文章',
  model,
  async show() {
    postTypes.value = (await getPosttypes()).list;
  },
  details(row) {
    return getPost(row.id);
  },
  beforeFill(row) {
    editId.value = row.id;
  },
  add: () => addPost(model),
  edit: () => updatePost(editId.value!, model),
});

const onBeforeClose = (done: any) => {
  ElMessageBox.confirm('确定关闭？', '提示', {
    type: 'warning',
  }).then(() => {
    done();
  });
};

defineExpose(expose);
</script>
