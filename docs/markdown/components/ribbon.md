# Ribbon 丝带角标

## 简介

在容器的角落展示一些关键的状态、标签或提示信息，例如推荐、促销、新品等。

## 代码演示

### 基础使用

需要给容器添加相对定位，会在右上角显示角标信息。

::: demo

ribbon/basic

:::

### 尺寸

使用 `size` 属性设置角标的宽高。

::: demo

ribbon/size

:::

### 幅度

使用 `breadth` 属性设置丝带的宽度，默认为角标斜边一半的0.5倍。

::: demo

ribbon/breadth

:::

### 颜色

使用 `background` 属性设置丝带背景色，使用 `color` 属性设置丝带文字颜色。

::: demo

ribbon/color

:::

### 间距

使用 `gap` 设置丝带与容器的间距大小。

::: demo

ribbon/gap

:::

### 方向

使用 `direction` 设置角标位于容器的哪个角落。

::: demo

ribbon/direction

:::

## API

### RibbonProps

| 属性       | 描述                     | 类型                                                         | 默认值      |
| ---------- | ------------------------ | ------------------------------------------------------------ | ----------- |
| direction  | 设置角标位于容器的方向   | 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' | 'top-right' |
| gap        | 设置角标与容器的间距大小 | number                                                       | 0           |
| size       | 设置角标宽高             | number                                                       | 150         |
| breadth    | 设置角标丝带幅度         | number                                                       | 0.5         |
| background | 设置丝带背景色           | string                                                       | -           |
| color      | 设置丝带文本颜色         | string                                                       | -           |

### RibbonSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
