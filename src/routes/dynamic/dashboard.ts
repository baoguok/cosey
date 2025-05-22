import { MergedLayoutBase, defineRoutes } from 'cosey';

/**
 * 仪表板路由
 */
export default defineRoutes({
  path: '/dashboard',
  name: 'Dashboard',
  component: MergedLayoutBase,
  meta: {
    title: '仪表板',
    icon: 'carbon:dashboard',
    order: -10,
    authority: (ability) => ability.can('read', 'analysis') || ability.can('read', 'workspace'),
  },
  children: [
    {
      path: 'workspace',
      name: 'Workspace',
      component: () => import('@/views/dashboard/workspace.vue'),
      meta: {
        title: '工作台',
        icon: 'carbon:workspace',
        closable: false,
        authority: (ability) => ability.can('read', 'workspace'),
      },
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        title: '分析页',
        icon: 'carbon:analytics',
        authority: (ability) => ability.can('read', 'analysis'),
      },
    },
  ],
});
