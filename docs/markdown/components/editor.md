# Editor 编辑器

## 简介

图片上传依赖于 `launch api.upload` 接口，需要保证接口返回一个文件地址。

## 代码演示

### 基础使用

使用 `v-model` 双向绑定编辑器值。

::: demo

editor/basic

:::

### 表单验证

`Editor` 组件接入了 `element-plus` 表单验证逻辑，使其可以像 `element-plus` 表单组件一样使用。

::: demo

editor/validate

:::

## API

### EditorProps

| 属性                  | 描述           | 类型    | 默认值 |
| --------------------- | -------------- | ------- | ------ |
| model-value (v-model) | 编辑器当前值   | string  | -      |
| placeholder           | 编辑器占位文本 | string  | -      |
| height                | 编辑器高度     | string  | -      |
| max-height            | 编辑器最大高度 | string  | -      |
| readonly              | 是否只读       | boolean | false  |
| disabled              | 是否禁用       | boolean | false  |

### EditorEmits

| 事件              | 描述               | 类型                    |
| ----------------- | ------------------ | ----------------------- |
| update:modelValue | 编辑器值改变时触发 | (value: string) => void |
| change            | 编辑器值改变时触发 | (value: string) => void |
