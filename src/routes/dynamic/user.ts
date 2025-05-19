import { defineRoutes, MergedLayoutBase } from 'cosey';

export default defineRoutes({
  path: '/',
  component: MergedLayoutBase,
  meta: {
    flatChildrenInMenu: true,
  },
  children: [
    {
      path: 'users',
      name: 'Users',
      component: () => import('@/views/users/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'carbon:user',
        order: -1,
        authority: (ability) => ability.can('read', 'user'),
      },
    },
  ],
});
