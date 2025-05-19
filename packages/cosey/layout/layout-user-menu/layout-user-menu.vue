<template>
  <el-dropdown placement="bottom">
    <div :class="[hashId, prefixCls]">
      <el-avatar :size="32" :src="userStore.userInfo?.avatar">
        <Icon name="co:user" />
      </el-avatar>
      <span :class="`${prefixCls}-name`">
        {{ userStore.userInfo?.nickname }}
      </span>
    </div>
    <template #dropdown>
      <el-dropdown-menu :class="[hashId, `${prefixCls}-dropdown`]">
        <el-dropdown-item @click="toHome">
          <Icon name="co:home" size="lg" />
          <span :class="`${prefixCls}-item-title`">首页</span>
        </el-dropdown-item>

        <component :is="UserMenu" />

        <el-dropdown-item @click="toChangePassword">
          <Icon name="co:password" size="lg" />
          <span :class="`${prefixCls}-item-title`">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <Icon name="co:logout" size="lg" />
          <span :class="`${prefixCls}-item-title`">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGlobalConfig } from '../../config';
import { useUserStore } from '../../store';
import { Icon, useComponentConfig } from '../../components';

import useStyle from './style';
import { defineTemplate } from '../../utils';

defineOptions({
  name: 'LayoutUserMenu',
});

const { prefixCls } = useComponentConfig('layout-user-menu');

const { hashId } = useStyle(prefixCls);

const router = useRouter();

const userStore = useUserStore();

const { router: routerConfig, slots: slotsConfig } = useGlobalConfig();

const UserMenu = defineTemplate(() => slotsConfig.userMenu?.());

const toHome = () => {
  router.push(routerConfig.homePath);
};

const toChangePassword = () => {
  router.push(routerConfig.changePasswordPath);
};

const logout = () => {
  userStore.logout();
};
</script>
