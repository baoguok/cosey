<template>
  <div :class="[hashId, prefixCls]">
    <div :class="`${prefixCls}-title`">登录</div>
    <el-form ref="formRef" :model="formState" @keyup.enter.prevent="onSubmit">
      <el-form-item prop="username" :rules="[{ required: true, message: '请输入用户名' }]">
        <el-input v-model="formState.username" size="large" placeholder="用户名">
          <template #prefix>
            <co-icon name="co:user" :class="`${prefixCls}-icon`" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码' }]">
        <el-input
          v-model="formState.password"
          type="password"
          show-password
          size="large"
          placeholder="密码"
        >
          <template #prefix>
            <co-icon name="co:password" :class="`${prefixCls}-icon`" />
          </template>
        </el-input>
      </el-form-item>

      <el-button
        size="large"
        type="primary"
        :class="`${prefixCls}-button`"
        :loading="loading"
        @click="onSubmit"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { type FormInstance, ElButton } from 'element-plus';
import { useUserStore } from '../../store';
import { reactive, ref, useTemplateRef } from 'vue';
import { useComponentConfig } from '../../components';
import useStyle from './style';

const { prefixCls } = useComponentConfig('layout-login');
const { hashId } = useStyle(prefixCls);

const userStore = useUserStore();

interface FormState {
  username: string;
  password: string;
}
const formState = reactive<FormState>({
  username: '',
  password: '',
});

const formRef = useTemplateRef<FormInstance>('formRef');

const loading = ref(false);

const onSubmit = () => {
  if (loading.value) return;

  formRef.value?.validate().then(() => {
    loading.value = true;
    userStore.login(formState).finally(() => {
      loading.value = false;
    });
  });
};
</script>
