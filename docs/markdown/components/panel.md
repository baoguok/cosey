# Panel 面板

## 简介

将信息聚合在面板容器中展示。相比较于 `ElCard`，面板更小巧。

## 代码演示

### 基础使用

::: demo

panel/basic

:::

### 最大高度

::: demo

panel/max-height

:::

## API

### PanelProps

| 属性       | 描述             | 类型             | 默认值 |
| ---------- | ---------------- | ---------------- | ------ |
| max-height | 设置面板最大高度 | string \| number | -      |
| header     | 设置面板标题     | string \| number | -      |

### PanelSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
| header  | 自定义头部内容 | -    |
