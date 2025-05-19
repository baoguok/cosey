# Icon 图标

## 简介

`RaIcon` 组件组合了 `RaIconifyIcon` 和 `RaSvgIcon` 组件，统一系统使用图标的方式。

`RaIconifyIcon` 组件默认引入了 `@iconify-json/ep` 图标库，这和 `element-plus` 官方图标库一致。
只要指定图标名称，组件内部会从中提取出图标的 `path` 组合成 `svg` 展示。

`RaSvgIcon` 组件可以展示 `@/assets/icons` 目录下的图标，当从内置的 `element-plus` 图标库找不到想要的图标时，
便可以从 `iconfont` 浩瀚的图标中进行挑选。

## 代码演示

### 基础使用

使用 `name` 属性指定要展示的图标，默认展示 `@iconify-json/ep` 中的图标。

::: demo

icon/basic

:::

### @iconify-json 库前缀

如果要展示不同 `@iconify-json` 库的图标，可以在图标名称基础上加上 “库名:” 前缀，默认为 `ep:`。

::: demo

icon/prefix

:::

### SvgIcon

如果要展示 `@/assets/icons` 目录下的图标，可以在图标名称基础上加上 `|svg` 后缀。

::: demo

icon/svg-icon

:::

## API

### RaIconProps

| 属性 | 描述     | 类型             | 默认值 |
| ---- | -------- | ---------------- | ------ |
| name | 图标名称 | string           | -      |
| size | 图标尺寸 | number \| string | -      |
