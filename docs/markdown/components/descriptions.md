# Descriptions 描述列表

## 简介

列表形式展示多个字段，通常用于表格中展示多个字段数据。

## 代码演示

### 基础使用

::: demo

descriptions/basic

:::

### 多列

::: demo

descriptions/multiple

:::

### 显示边框

::: demo

descriptions/border

:::

## API

### DescriptionsProps

| 属性        | 描述             | 类型                          | 默认值  |
| ----------- | ---------------- | ----------------------------- | ------- |
| data        | 列表数据         | any[][]                       | []      |
| label-align | 列的标签对齐方式 | 'left' \| 'center' \| 'right' | 'right' |
| border      | 是否显示边框     | boolean                       | false   |
| colon       | 是否显示冒号     | boolean                       | true    |
