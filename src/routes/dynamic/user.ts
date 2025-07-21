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
        title: 'user.userManagement',
        icon: 'carbon:user',
        order: -1,
        authority: (ability) => ability.can('read', 'user'),
      },
    },
  ],
});
