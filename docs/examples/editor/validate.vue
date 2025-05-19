<template>
  <co-form :model="formModel" label-width="60px" :submit="onSubmit">
    <co-form-item prop="content" label="内容" :rules="[{ required: true }]">
      <co-editor v-model="formModel.content" placeholder="请输入" />
    </co-form-item>
  </co-form>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

const formModel = reactive({
  content: undefined,
});

const onSubmit = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  ElMessage.success('提交成功');
};
</script>
