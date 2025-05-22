# 构建部署

## 构建

项目开发完成之后，执行以下命令进行构建：

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

构建打包成功之后，会在根目录生成对应的应用下的 dist 文件夹，里面就是构建打包好的文件。

## 预览

发布之前可以在本地进行预览，请在项目根目录下执行以下命令：

::: code-group

```bash [npm]
npm run preview
```

```bash [pnpm]
pnpm preview
```

```bash [yarn]
yarn preview
```

```bash [bun]
bun run preview
```

:::

## 部署

简单的部署只需要将最终生成的静态文件，dist 文件夹的静态文件发布到你的 cdn 或者静态服务器，同时需要进行[服务器端的配置](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AE%E7%A4%BA%E4%BE%8B)。
