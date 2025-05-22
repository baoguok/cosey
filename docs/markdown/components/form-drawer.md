# FormDrawer 抽屉表单

## 简介

`FormDrawer` 是 `ElDrawer` 组件的高阶组件，拥有相同的接口，用于配合 `Form` 组件使用，`Form` 表单的按钮会移到 `FormDrawer` 的底部插槽位置。

## 代码演示

### 基础演示

::: demo

form-drawer/basic

:::

## API

### FormDrawerProps

除了支持 `element-plus` 的 [Drawer Attributes](https://element-plus.org/zh-CN/component/drawer.html#%E5%B1%9E%E6%80%A7)，还支持以下属性：

| 属性          | 描述             | 类型        | 默认值 |
| ------------- | ---------------- | ----------- | ------ |
| confirm-text  | 确定按钮的文案   | string      | '确定' |
| cancel-text   | 取消按钮的文案   | string      | '取消' |
| confirm-props | 确定按钮的属性   | ButtonProps | -      |
| cancel-props  | 取消按钮的属性   | ButtonProps | -      |
| hide-confirm  | 是否隐藏确定按钮 | boolean     | false  |
| hide-cancel   | 是否隐藏取消按钮 | boolean     | false  |

### FormDrawerSlots

除了支持 `element-plus` 的 [Drawer Slots](https://element-plus.org/zh-CN/component/drawer.html#%E6%8F%92%E6%A7%BD)，还支持以下插槽。

| 插槽   | 描述           | 属性                                                                            |
| ------ | -------------- | ------------------------------------------------------------------------------- |
| button | 自定义表单按钮 | { submitting: boolean; confirm: () => any \| Promise\<any>; cancel: () => any;} |

### FormDrawerEmits

同 `element-plus` 的 [Drawer Events](https://element-plus.org/zh-CN/component/drawer.html#%E4%BA%8B%E4%BB%B6)。

### FormDrawerExpose

同 `element-plus` 的 [Drawer Exposes](https://element-plus.org/zh-CN/component/drawer.html#%E6%9A%B4%E9%9C%B2)。
