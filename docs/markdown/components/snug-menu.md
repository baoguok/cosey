# SnugMenu 舒适菜单

## 简介

简介

## 代码演示

### 基础使用

::: demo

snug-menu/basic

:::

### 水平模式

::: demo

snug-menu/horizontal

:::

## API

### RaSnugMenuProps

| 属性                 | 描述                       | 类型                       | 默认值     |
| -------------------- | -------------------------- | -------------------------- | ---------- |
| mode                 | 菜单展示模式               | 'horizontal' \| 'vertical' | 'vertical' |
| model-value(v-model) | 当前活动的菜单项的唯一标志 | string                     | -          |

### RaSnugMenuSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### RaSnugMenuEmits

| 事件              | 描述           | 类型                   |
| ----------------- | -------------- | ---------------------- |
| change            | 选择菜单时触发 | (name: string) => void |
| update:modelValue | 选择菜单时触发 | (name: string) => void |

### RaSnugMenuItemProps

| 属性  | 描述                     | 类型   | 默认值 |
| ----- | ------------------------ | ------ | ------ |
| name  | 菜单项的唯一标志（必填） | string | -      |
| icon  | 菜单项的图标             | string | -      |
| title | 菜单项的标题             | string | -      |
