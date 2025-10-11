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

## 配置

配置 `src/api/auth.ts` 的接口地址和 `.env` 中的网站名称、logo即可。

经过上面步骤启动了开发服务器，你会在浏览器可以看到一个登录页；输入账号密码，登录成功便进入到后台首页。
