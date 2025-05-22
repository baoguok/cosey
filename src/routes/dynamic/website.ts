import { defineRoutes, MergedLayoutBase, MergedLayoutEmpty } from 'cosey';

export default defineRoutes({
  path: '/website',
  component: MergedLayoutBase,
  meta: {
    title: '外部页面',
    icon: 'carbon:application-web',
  },
  children: [
    {
      path: 'link',
      meta: {
        title: '外链',
        icon: 'carbon:launch',
        type: 'group',
      },
      children: [
        {
          path: 'https://cn.vuejs.org/',
          component: MergedLayoutEmpty,
          meta: {
            title: 'Vue',
            icon: 'svg:vue',
          },
        },
        {
          path: 'https://cn.vitejs.dev/',
          component: MergedLayoutEmpty,
          meta: {
            title: 'Vite',
            icon: 'svg:vite',
          },
        },
      ],
    },
    {
      path: 'iframe',
      meta: {
        title: '内嵌',
        icon: 'carbon:ibm-consulting-advantage-application',
      },
      children: [
        {
          path: 'element',
          component: MergedLayoutEmpty,
          meta: {
            title: 'element',
            icon: 'svg:element',
            iframeSrc: 'https://element-plus.org/zh-CN/',
          },
        },
        {
          path: 'pinia',
          component: MergedLayoutEmpty,
          meta: {
            title: 'pinia',
            icon: 'svg:pinia',
            iframeSrc: 'https://pinia.vuejs.org/',
          },
        },
      ],
    },
  ],
});
