import { defineRoutes } from '../../utils';

import MergedLayoutAuth from '../../../layout/layout-auth';
import MergedLayoutChangePassword from '../../../layout/layout-change-password';
import MergedLayoutLogin from '../../../layout/layout-login';

/**
 * 身份验证相关路由
 */
export default defineRoutes({
  path: '/auth',
  name: 'Auth',
  component: MergedLayoutAuth,
  redirect: '/auth/login',
  meta: {
    hideInMenu: true,
  },
  children: [
    {
      path: 'login',
      name: 'Login',
      component: MergedLayoutLogin,
      meta: {
        title: '登录',
        authentication: false,
      },
    },
    {
      path: 'change-password',
      name: 'ResetPassword',
      component: MergedLayoutChangePassword,
      meta: {
        title: '重置密码',
      },
    },
  ],
});
