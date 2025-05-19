import { defineConfig } from 'vitepress';
import path from 'node:path';
import { markdownPlugin } from './markdown';
import tailwindcss from '@tailwindcss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import injectStyles from './vite-plugin-inject-styles';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Cosey 框架',
  description: 'A VitePress Site',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'docs'),
      },
    },
    plugins: [tailwindcss(), vueJsx(), injectStyles()] as any,
    ssr: {
      noExternal: true,
    },
  },
  markdown: {
    config(md) {
      markdownPlugin(md);
    },
  },
  head: [['link', { ref: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    siteTitle: 'Cosey 框架',
    logo: '/logo.svg',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '教程', link: '/learn/start/intro' },
      { text: '组件', link: '/components/overview' },
    ],

    sidebar: {
      '/learn/': [
        {
          text: '起步',
          items: [
            { text: '介绍', link: '/learn/start/intro' },
            { text: '安装', link: '/learn/start/installation' },
            { text: '配置', link: '/learn/start/configuration' },
          ],
        },
        {
          text: '基础',
          items: [
            { text: '路由与菜单', link: '/learn/basic/intro' },
            { text: '配置', link: '/learn/basic/installation' },
            { text: '构建部署', link: '/learn/basic/configuration' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Basic 基础组件',
          items: [
            {
              text: 'Grid 栅格',
              link: '/components/grid',
            },
            { text: 'Icon 图标', link: '/components/icon' },
          ],
        },
        {
          text: 'Form 表单组件',
          items: [
            { text: 'Editor 编辑器', link: '/components/editor' },
            { text: 'Form 表单', link: '/components/form' },
            { text: 'FormDialog 对话框表单', link: '/components/form-dialog' },
            { text: 'FormDrawer 抽屉表单', link: '/components/form-drawer' },
            { text: 'FormList 表单列表', link: '/components/form-list' },
            { text: 'FormQuery 查询表单', link: '/components/form-query' },
            { text: 'Upload 上传', link: '/components/upload' },
          ],
        },
        {
          text: 'Data 数据展示',
          items: [
            { text: 'Highlight 代码高亮', link: '/components/highlight' },
            { text: 'MediaCard 媒体卡片', link: '/components/media-card' },
            {
              text: 'NumberFormat 数字格式化',
              link: '/components/number-format',
            },
            { text: 'ScrollView 滚动视图', link: '/components/scroll-view' },
            { text: 'Table 表格', link: '/components/table' },
          ],
        },
        {
          text: 'Navigation 导航',
          items: [
            {
              text: 'ContextMenu 上下文菜单',
              link: '/components/context-menu',
            },
            { text: 'SnugMenu 舒适菜单', link: '/components/snug-menu' },
          ],
        },
        {
          text: 'Feedback 反馈组件',
          items: [
            { text: 'Copy 复制', link: '/components/copy' },
            { text: 'DndSort 拖拽排序', link: '/components/dnd-sort' },
            {
              text: 'TransitionGroup 过渡组',
              link: '/components/transition-group',
            },
          ],
        },
      ],
    },

    outline: {
      level: 'deep',
      label: '页面导航',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
  rewrites: {
    'markdown/:page1': ':page1',
    'markdown/:page1/:page2': ':page1/:page2',
    'markdown/:page1/:page2/:page3': ':page1/:page2/:page3',
    'markdown/:page1/:page2/:page3/:page4': ':page1/:page2/:page3/:page4',
  },
});
