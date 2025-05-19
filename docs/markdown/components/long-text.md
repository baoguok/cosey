# LongText 长文本

## 简介

可限制文本最大展示行数，可通过鼠标移上去显示的 tooltip 显示完整文本。

## 代码演示

### 基础使用

::: demo

long-text/basic

:::

### 最大显示行数

::: demo

long-text/rows

:::

### tooltip 最大显示宽度

::: demo

long-text/max-width

:::

### tooltip 最大显示高度

::: demo

long-text/max-height

:::

## API

### RaLongTextProps

| 属性       | 描述                 | 类型             | 默认值 |
| ---------- | -------------------- | ---------------- | ------ |
| text       | 要渲染的文本         | string           | -      |
| rows       | 最大显示行数         | number \| string | 3      |
| max-width  | tooltip 最大显示宽度 | number \| string | 690    |
| max-height | tooltip 最大显示宽度 | number \| string | 320    |

### RaLongTextSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
