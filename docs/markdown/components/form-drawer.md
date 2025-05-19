# FormDrawer 抽屉表单

## 简介

`RaFormDrawer` 是 `ElDrawer` 组件的高阶组件，拥有相同的接口，用于配合 `RaForm` 组件使用，`RaForm` 表单的按钮会移到 `RaFormDrawer` 的底部插槽位置。

## 代码演示

### 基础演示

::: demo

form-drawer/basic

:::

## API

### RaFormDrawerProps

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/drawer.html#%E5%B1%9E%E6%80%A7">Drawer Attributes</a>，还支持以下属性：

| 属性          | 描述             | 类型        | 默认值 |
| ------------- | ---------------- | ----------- | ------ |
| confirm-text  | 确定按钮的文案   | string      | '确定' |
| cancel-text   | 取消按钮的文案   | string      | '取消' |
| confirm-props | 确定按钮的属性   | ButtonProps | -      |
| cancel-props  | 取消按钮的属性   | ButtonProps | -      |
| hide-confirm  | 是否隐藏确定按钮 | boolean     | false  |
| hide-cancel   | 是否隐藏取消按钮 | boolean     | false  |

### RaFormDrawerSlots

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/drawer.html#%E6%8F%92%E6%A7%BD">Drawer Slots</a>，还支持以下插槽。

| 插槽   | 描述           | 属性                                                                            |
| ------ | -------------- | ------------------------------------------------------------------------------- |
| button | 自定义表单按钮 | { submitting: boolean; confirm: () => any \| Promise\<any>; cancel: () => any;} |

### RaFormDrawerEmits

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/drawer.html#%E4%BA%8B%E4%BB%B6">Drawer Events</a>。

### RaFormDrawerExpose

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/drawer.html#%E6%9A%B4%E9%9C%B2">Drawer Exposes</a>。
