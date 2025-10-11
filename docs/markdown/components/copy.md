# Copy 复制

## 简介

可点击复制文本的按钮，会显示复制成功的状态。

## 代码演示

### 基础使用

通过 `text` 属性指定要复制的文本。

::: demo

copy/basic

:::

### 类型

使用 `type` 属性设置按钮类型。

::: demo

copy/type

:::

## API

### CopyProps

| 属性 | 描述         | 类型                                                                                     | 默认值 |
| ---- | ------------ | ---------------------------------------------------------------------------------------- | ------ |
| text | 要复制的文本 | string                                                                                   | -      |
| type | 按钮类型     | [ButtonProps](https://element-plus.org/zh-CN/component/button#button-attributes)['type'] | ''     |
