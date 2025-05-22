import { defineRoutes, MergedLayoutBase } from 'cosey';

export default defineRoutes({
  path: '/blog',
  name: 'Blog',
  component: MergedLayoutBase,
  meta: {
    title: '博客管理',
    icon: 'carbon:blog',
    authority: (ability) =>
      ability.can('read', 'blog_type') ||
      ability.can('read', 'blog_post') ||
      ability.can('read', 'blog_comment'),
  },
  children: [
    {
      path: 'post-types',
      name: 'BlogPostTypes',
      component: () => import('@/views/blog/post-types/index.vue'),
      meta: {
        title: '分类管理',
        icon: 'carbon:category',
        authority: (ability) => ability.can('read', 'blog_type'),
      },
    },
    {
      path: 'posts',
      name: 'BlogPosts',
      component: () => import('@/views/blog/posts/index.vue'),
      meta: {
        title: '文章管理',
        icon: 'carbon:document',
        authority: (ability) => ability.can('read', 'blog_post'),
      },
    },
    {
      path: 'post-comments',
      name: 'BlogPostComments',
      component: () => import('@/views/blog/post-comments/index.vue'),
      meta: {
        title: '评论管理',
        icon: 'carbon:chat',
        authority: (ability) => ability.can('read', 'blog_comment'),
      },
    },
  ],
});
