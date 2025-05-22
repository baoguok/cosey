import { defineRoutes, MergedLayoutBase } from 'cosey';

export default defineRoutes({
  path: '/rbac',
  name: 'Rbac',
  component: MergedLayoutBase,
  meta: {
    title: '访问控制',
    icon: 'carbon:user-access',
    order: 100,
    authority: (ability) =>
      ability.can('read', 'rbac_user') ||
      ability.can('read', 'rbac_role') ||
      ability.can('read', 'rbac_permission'),
  },
  children: [
    {
      path: 'admins',
      name: 'RbacAdmins',
      component: () => import('@/views/rbac/admins/index.vue'),
      meta: {
        title: '账号管理',
        icon: 'carbon:user-admin',
        authority: (ability) => ability.can('read', 'rbac_user'),
      },
    },
    {
      path: 'roles',
      name: 'RbacRoles',
      component: () => import('@/views/rbac/roles/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'carbon:user-role',
        authority: (ability) => ability.can('read', 'rbac_role'),
      },
    },
    {
      path: 'permissions',
      name: 'RbacPermissions',
      component: () => import('@/views/rbac/permissions/index.vue'),
      meta: {
        title: '权限管理',
        icon: 'carbon:rule',
        authority: (ability) => ability.can('read', 'rbac_permission'),
      },
    },
  ],
});
