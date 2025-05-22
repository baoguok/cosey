import { defineRoutes } from '../../utils';

import MergedLayoutAuth from '../../../layout/merged/layout-auth';
import MergedLayoutChangePassword from '../../../layout/merged/layout-change-password';
import MergedLayoutLogin from '../../../layout/merged/layout-login';

/**
 * 身份验证相关路由
 */
export default defineRoutes({
  path: '/auth',
  name: 'Auth',
  component: MergedLayoutAuth,
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
      name: 'ChangePassword',
      component: MergedLayoutChangePassword,
      meta: {
        title: '修改密码',
      },
    },
  ],
});
