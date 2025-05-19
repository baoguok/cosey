<template>
  <div :class="[hashId, prefixCls]">
    <div :class="`${prefixCls}-title`">修改密码</div>
    <el-form ref="formRef" :model="formState" @keyup.enter.prevent="onSubmit">
      <el-form-item prop="oldPassword" :rules="[{ required: true, message: '请输入原密码' }]">
        <el-input
          v-model="formState.oldPassword"
          type="password"
          show-password
          size="large"
          placeholder="原密码"
        >
          <template #prefix>
            <co-icon name="co:password" :class="`${prefixCls}-icon`" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="newPassword" :rules="[{ required: true, message: '请输入新密码' }]">
        <el-input
          v-model="formState.newPassword"
          type="password"
          show-password
          size="large"
          placeholder="新密码"
        >
          <template #prefix>
            <co-icon name="co:password" :class="`${prefixCls}-icon`" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item
        prop="confirmNewPassword"
        :rules="[
          { required: true, message: '请输入确认密码' },
          {
            validator(_, value) {
              return value === formState.newPassword;
            },
            message: '两次密码不一致',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model="formState.confirmNewPassword"
          type="password"
          show-password
          size="large"
          placeholder="确认密码"
        >
          <template #prefix>
            <co-icon name="co:password" :class="`${prefixCls}-icon`" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          size="large"
          type="primary"
          :class="`${prefixCls}-button`"
          :loading="loading"
          @click="onSubmit"
        >
          修改密码
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button size="large" :class="`${prefixCls}-button`" @click="router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import { useComponentConfig } from '../../components';
import useStyle from './style';
import { useUserStore } from '../../store';
import { ElMessage, type FormInstance, ElButton } from 'element-plus';

const { prefixCls } = useComponentConfig('layout-change-password');

const { hashId } = useStyle(prefixCls);

const userStore = useUserStore();

const router = useRouter();

const formState = reactive({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});

const formRef = useTemplateRef<FormInstance>('formRef');

const loading = ref(false);

const onSubmit = () => {
  if (loading.value) return;

  formRef.value?.validate().then(() => {
    loading.value = true;
    userStore
      .changePassword({
        oldPassword: formState.oldPassword,
        newPassword: formState.newPassword,
      })
      .then(() => {
        ElMessage.success('修改成功，请重新登录');
        userStore.logout();
      })
      .catch(() => {})
      .finally(() => {
        loading.value = false;
      });
  });
};
</script>
