# ContextMenu 上下文菜单

## 简介

通过点击鼠标右键展示的菜单，菜单会在鼠标右下角展示。

## 代码演示

### 基础使用

使用 `#reference` 来放置触发元素。

::: demo

context-menu/basic

:::

### 手动触发

可调用 `open()` 方法并传递坐标来展示。

::: demo

context-menu/manual

:::

### 子菜单

支持任意层级的嵌套。

::: demo

context-menu/sub-menu

:::

## API

### ContextMenuProps

| 属性     | 描述     | 类型    | 默认值 |
| -------- | -------- | ------- | ------ |
| disabled | 是否禁用 | boolean | false  |

### ContextMenuSlots

| 插槽      | 描述                     | 属性 |
| --------- | ------------------------ | ---- |
| default   | 菜单内容                 | -    |
| reference | 触发菜单显示的 HTML 元素 | -    |

### ContextMenuEmits

| 事件    | 描述                                                  | 类型                 |
| ------- | ----------------------------------------------------- | -------------------- |
| command | 当菜单项被点击时触发，参数是菜单项 `command` 属性的值 | (value: any) => void |
| open    | 上下文菜单显示时触发                                  | () => void           |
| close   | 上下文菜单隐藏时触发                                  | () => void           |

### ContextMenuExpose

| 属性  | 描述           | 类型                           |
| ----- | -------------- | ------------------------------ |
| open  | 打开上下文菜单 | (x: number, y: number) => void |
| close | 关闭上下文菜单 | () => void                     |

### ContextMenuItemProps

| 属性     | 描述                                | 类型    | 默认值 |
| -------- | ----------------------------------- | ------- | ------ |
| command  | 派发到 `command` 回调函数的指令参数 | any     | -      |
| disabled | 是否禁用                            | boolean | false  |
| divided  | 是否显示分隔符                      | boolean | false  |
| icon     | 自定义图标                          | string  | -      |
| title    | 菜单标题                            | string  | -      |

### ContextSubMenuProps

| 属性     | 描述           | 类型    | 默认值 |
| -------- | -------------- | ------- | ------ |
| disabled | 是否禁用       | boolean | false  |
| divided  | 是否显示分隔符 | boolean | false  |
| icon     | 自定义图标     | string  | -      |
| title    | 菜单标题       | string  | -      |

### ContextSubMenuSlots

| 插槽    | 描述       | 属性 |
| ------- | ---------- | ---- |
| default | 子菜单内容 | -    |
