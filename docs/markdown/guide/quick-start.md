# 快速开始

## 安装

### 前置准备

- [Node.js](https://nodejs.org/) 18 及以上版本。
- 命令行工具 (CLI)。
- 编辑器
  - 推荐 VSCode 即以下扩展：
    - JavaScript and TypeScript Nightly
    - Vue - Official
    - ESLint
    - Prettier - Code formatter

### 创建一个 Cosey 应用

::: code-group

```bash [npm]
npm create cosey@latest
```

```bash [pnpm]
pnpm create cosey@latest
```

```bash [yarn]
yarn create cosey@latest
```

```bash [bun]
bun create cosey@latest
```

:::

这一指令将会安装并执行 `create-cosey`，它是用于搭建 Cosey 项目的脚手架工具。你将会看到类似如下的功能提示：

```bash
┌  Cosey - 助你极速搭建后台管理框架
│
◇  请输入项目名称：
│  cosey-project

正在初始化项目...
│
└  项目初始化完成
```

在项目被创建后，通过以下步骤安装依赖并启动开发服务器：

::: code-group

```bash [npm]
cd cosey-project
npm install
npm run format
npm run dev
```

```bash [pnpm]
cd cosey-project
pnpm install
pnpm format
pnpm dev
```

```bash [yarn]
cd cosey-project
yarn
yarn format
yarn dev
```

```bash [bun]
cd cosey-project
bun install
bun run format
bun run dev
```

:::

当你准备将应用发布到生产环境时，请运行：

::: code-group

```bash [npm]
npm run build
```

```bash [pnpm]
pnpm build
```

```bash [yarn]
yarn build
```

```bash [bun]
bun run build
```

:::

此命令会在 `./dist` 文件夹中为你的应用创建一个生产环境的构建版本。关于将应用上线生产环境的更多内容，请阅读生产环境部署指南。

### 在现有项目中使用 Cosey

推荐使用 `create-cosey` 创建项目，如果已有一个 vue 项目，可以通过以下步骤来使用 Cosey：

安装 Cosey 和 `@iconify-json/carbon` 图标:

::: code-group

```bash [npm]
npm install cosey@latest @iconify-json/carbon
```

```bash [pnpm]
pnpm add cosey@latest @iconify-json/carbon
```

```bash [yarn]
yarn add cosey@latest @iconify-json/carbon
```

```bash [bun]
bun add cosey@latest @iconify-json/carbon
```

:::

使用 `RootConfigProvider` 组件包裹 `router-view` 组件，以便提供全局且必要的配置：

```html {3,5,9} [App.vue]
<template>
  <RootConfigProvider>
    <RouterView />
  </RootConfigProvider>
</template>

<script setup lang="ts">
  import { RootConfigProvider } from 'cosey';
  import { RouterView } from 'vue-router';
</script>
```

创建后台首页文件：

```vue [src/views/dashboard/workspace.vue]
<template>
  <co-container>
    <el-avatar :size="80" :src="userStore.userInfo?.avatar" />
    <div>您好，“{{ userStore.userInfo?.nickname }}”！</div>
  </co-container>
</template>

<script lang="ts" setup>
import { useUserStore } from 'cosey';
const userStore = useUserStore();
</script>
```

创建路由定义：

```ts [src/routes/dynamic/dashboard.ts]
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
      },
    },
  ],
});
```

创建统一导出路由文件：

```ts [src/routes/index.ts]
import { mergeRouteModules } from 'cosey';

// 批量导入动态路由模块
const dynamicModules = import.meta.glob('./dynamic/**/*.ts', { eager: true });

export const dynamicRoutes = mergeRouteModules(dynamicModules);

// 批量导入静态路由模块
const staticModules = import.meta.glob('./static/**/*.ts', { eager: true });

export const staticRoutes = mergeRouteModules(staticModules);
```

cosey 中路由分为动态路由和静态路由，动态路由需要经过身份认证后才会动态挂载，静态路由则立即挂载。

新建 `auth.ts` 文件来保存认证相关的接口：

```ts [src/api/auth.ts]
import { useRequest } from 'cosey';

const Api = {
  Login: '/auth/login',
  UserInfo: '/auth/info',
};

export const useAuthApi = () =>
  useRequest().map({
    login: (http) => async (data: unknown) => {
      const res = await http.post(Api.Login, data);
      return res.token as string;
    },

    getUserInfo: (http) => () => {
      return http.get(Api.UserInfo);
    },
  });
```

上面用到了 `useRequest` 钩子，这是在 cosey 中发送请求的使用方式。

`login` 接口必须返回一个 `token` 字符串；`getUserInfo` 接口需要返回 `nickname` 和 `avatar` 字段数据，如果接口不满足的，可以简单转换一下。

使用 `createCosey` 创建 `cosey` 对象，配置路由（cosey 会创建路由，无需再次创建），配置接口，并安装为 vue 插件：

```ts [main.ts]
import { createCosey } from 'cosey';
import { useAuthApi } from '@/api/auth';
import { dynamicRoutes, staticRoutes } from '@/routes';

import { icons as carbonIcons } from '@iconify-json/carbon';
import { addIconifyIcon } from 'cosey/components';
addIconifyIcon('carbon', carbonIcons);

const cosey = createCosey({
  router: { dynamic: dynamicRoutes, static: staticRoutes },
  http: {
    baseURL: import.meta.env.VITE_BASE_URL,
  },
  api: {
    login: () => {
      return useAuthApi().login;
    },
    getUserInfo: () => {
      return useAuthApi().getUserInfo;
    },
  },
  site: {
    logo: import.meta.env.VITE_APP_LOGO,
    name: import.meta.env.VITE_APP_TITLE,
  },
});

app.use(cosey);
```

在上面配置中，

- `router` 用于配置路由；
- `http.baseURL` 用于统一配置接口地址前缀；
- `api` 用于定义 cosey 内部使用到的接口；
- `site` 配置网站名称和 logo；
- `import.meta.env` 引用 `.env` 环境变量中的数据，一般情况下网站名称和 logo 等信息保存在 `.env` 文件，以便同时被 `index.html` 引用。
- `addIconifyIcon` 是 cosey 导出的用于注册 iconify 的函数。

## 配置

如果是通过 `create-cosey` 创建的项目，简单配一下 `src/api/auth.ts` 的接口地址和 `.env` 中的网站名称、logo即可。

经过上面步骤启动了开发服务器，你会在浏览器可以看到一个登录页；输入账号密码，登录成功便进入到后台首页。
