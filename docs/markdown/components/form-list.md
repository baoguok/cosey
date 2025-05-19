# FormList 表单列表

## 简介

`RaFormList` 继承于 `RaFormItem` 组件，自带了新增、删除等操作按钮，用于处理数组结构的表单数据。

## 代码演示

### 基础演示

`RaFormList` 会给默认插槽传递必要的数据，`row` 用于绑定一行的数据，`getProp` 用于拼接表单组件的 `prop`。

::: demo

form-list/basic

:::

### 自定义列

默认情况下，`RaFormList` 会读取默认插槽内子组件中为 `RaFormItem` 组件的 `width`、`required`、`rules required` 以及 `label` 等信息生成列表头部。

如果 `RaFormItem` 不是作为其直接子组件或有其他影响布局的组件，则需手动通过 `columns` 属性声明列头信息。

::: demo

form-list/columns

:::

### 默认值

可以通过 `default-value` 属性定义新增时的默认行数据。

::: demo

form-list/default-value

:::

### 行数量范围

可以通过 `min`、`max` 属性设置最小、最大行数。

::: demo

form-list/minmax

:::

### 拖拽排序

设置 `draggable` 属性可以在每行前面生成拖拽按钮，可以通过上下拖拽来调整其顺序。

::: demo

form-list/draggable

:::

### 自定义结构

如果默认结构不满足需求，可以使用 `custom` 插槽自定义结构，`custom` 插槽接收以下参数：

- `list` 列表数据，用于遍历并绑定到表单项。
- `getKey` 接收行对象作为参数，返回对应的全局唯一的 `key`。
- `getProp` 用于拼接表单项的 `prop`。
- `add` 添加一行数据，不传递参数则使用默认值。
- `remove` 接收行下标，用于移除一行数据。
- `move` 移动一行数据，通常用于配合 `RaDndSort` 组件使用。

如果需要拖拽排序，可以配合 `RaDndSort` 组件使用。

如果需要在列表组件变动时添加动画效果，可以配合 `RaTransitionGroup` 组件使用。

::: demo

form-list/custom

:::

### 嵌套

列表里面也可以嵌套列表。

::: demo

form-list/nested

:::

## API

### RaFormListProps\<T>

继承 `RaFormProps` ，并有以下复写或额外属性。

| 属性          | 描述                                   | 类型                                                              | 默认值 |
| ------------- | -------------------------------------- | ----------------------------------------------------------------- | ------ |
| default-value | 新增行的默认值                         | T                                                                 | {}     |
| model-value   | 绑定的值                               | T[]                                                               | []     |
| min           | 最少行数，少于等于此数值则隐藏删除按钮 | number                                                            | -      |
| max           | 最多行数，大于等于此数值则隐藏新增按钮 | number                                                            | -      |
| add-text      | 新增按钮的文本                         | string                                                            | '新增' |
| columns       | 自定义列头                             | { label?: string; width?: RaFormItemWidth; required?: boolean }[] | -      |
| draggable     | 是否可拖拽排序                         | boolean                                                           | false  |

### RaFormListSlots\<T>

继承 `RaFormProps` ，并有以下复写或额外属性。

| 插槽    | 描述             | 属性                                                                                                                    |
| ------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| default | 默认结构的内容   | \{ row: T; index: number; getProp: (...args: (string \| number)[]) => string[]; }                                       |
| custom  | 自定义结构的内容 | { list: T[]; getKey: (row: T) => string; getProp: (...args: (string \| number)[]) => string[]; } & RaFormListAction\<T> |

### RaFormListEmits\<T>

| 事件              | 描述               | 类型                 |
| ----------------- | ------------------ | -------------------- |
| update:modelValue | 列表数据改变时触发 | (value: T[]) => void |

### RaFormListAction\<T>

| 属性   | 描述                                       | 类型                                         |
| ------ | ------------------------------------------ | -------------------------------------------- |
| add    | 新增一行数据，默认根据默认值新增到列表最后 | (row?: T, index?: number) => void            |
| remove | 删除指定下标的一行数据                     | (index: number) => void                      |
| move   | 移动一行数据                               | (fromIndex: number, toIndex: number) => void |

### RaFormListExpose\<T>

继承 `RaFormItemExpose` 和 `RaFormListAction<T>`。
