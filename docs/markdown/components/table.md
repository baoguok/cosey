# Table 表格

## 简介

在ElTable基础上，新增分页、查询表单、工具栏等功能，预设了默认的使用方式，简化样板代码。

## 代码演示

### 基础使用

要建立一个增删改查表格，可通过以下步骤：

- 首先在 `src/config/component.ts` 中配置全局列表接口结构；
- 使用 `useTable` 配置表格属性，简化表格组件方法的调用；
- 使用 `columns` 属性配置表格列；
- 使用 `actionColumn` 属性配置操作列；
- 使用 `formProps` 属性配置查询表单；
- 使用 `api` 属性建立与服务器的联系；
- 使用对话框等组件创建“新增/编辑”表单。

::: demo

table/basic

:::

## API

### RaTableProps

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7">Table 属性</a> ，还支持以下属性。

| 属性           | 描述                                     | 类型                                 | 默认值 |
| -------------- | ---------------------------------------- | ------------------------------------ | ------ |
| api            | 请求数据的函数                           | (...args: any[]) => Promise\<any>    | -      |
| immediate      | 是否在挂载后立即请求数据                 | boolean                              | true   |
| columns        | 定义表格列                               | RaTableColumnProps[]                 | []     |
| action-column  | 定义表格操作列                           | RaTableColumnProps                   | -      |
| pagination     | 设置分页属性或隐藏分页组件               | boolean \| PaginationProps           | true   |
| get-expose     | 获取 `RaTableExpose`，会在组件创建后调用 | (expose: RaTableExpose) => void      | -      |
| form-props     | 自定义查询表单属性                       | RaTableQueryProps                    | -      |
| before-fetch   | 请求之前对参数进行处理                   | (params: Record<string, any>) => any | -      |
| after-fetch    | 请求之后对返回值进行处理                 | (res: any) => any                    | -      |
| toolbar-config | 设置工具栏按钮                           | ToolbarConfig \| boolean             | -      |

### ToolbarConfig

| 属性       | 描述               | 类型    | 默认值 |
| ---------- | ------------------ | ------- | ------ |
| reload     | 是否显示重载按钮   | boolean | true   |
| export     | 是否显示导出按钮   | boolean | true   |
| fullScreen | 是否显示全屏按钮   | boolean | true   |
| setting    | 是否显示列设置按钮 | boolean | true   |

### RaTableSlots

除了支持 `element-plus` 的 <el-link type="primary" href="https://element-plus.org/zh-CN/component/table.html#table-%E6%8F%92%E6%A7%BD" target="_blank">Table 插槽</el-link> 和以下插槽，还能定义 `RaTableColumnProps["slots"]` 中同名的插槽。

| 插槽          | 描述                   | 属性 |
| ------------- | ---------------------- | ---- |
| toolbar-left  | 自定义工具栏左边的内容 | -    |
| toolbar-right | 自定义工具栏右边的内容 | -    |

### RaTableEmits

同 <el-link type="primary" href="https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6" target="_blank">Table 事件</el-link> 。

### RaTableExpose

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/table.html#table-exposes">Table Exposes</a> ，以及 `RaFormQueryExpose`，还支持以下属性。

| 属性           | 描述                             | 类型                                  |
| -------------- | -------------------------------- | ------------------------------------- |
| reload         | 刷新表格数据                     | () => void                            |
| getFieldsValue | 获取查询表单数据（克隆后的对象） | () => Record\<string, any>            |
| setFieldsValue | 设置表单模型数据                 | (value: Record\<string, any>) => void |
| getFormModel   | 获取查询表单模型对象             | () => Record\<string, any>            |

### RaTableColumnProps

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7">Table-column 属性</a>，还支持以下属性。

| 属性     | 描述                   | 类型                    | 默认值 |
| -------- | ---------------------- | ----------------------- | ------ |
| slots    | 定义插槽或声明插槽名称 | RaTableColumnPropsSlots | -      |
| renderer | 使用内置渲染器进行渲染 | RendererType            | 'text' |
| hidden   | 是否隐藏当前列         | boolean                 | false  |
| columns  | 定义嵌套的表格列       | RaTableColumnProps[]    | -      |

### RaTableColumnPropsSlots

当值设置为非对象时，表示设置默认插槽。各个插槽的值可以是字符串或函数，如果是字符串，则从 `RaTableSlots` 中匹配对应的插槽内容。

```ts
type RaTableColumnPropsSlots =
  | string
  | ((props: { row: any; column: any; $index: number }) => any)
  | {
      default?: string | ((props: { row: any; column: any; $index: number }) => any);
      header?: string | ((props: { column: any; $index: number }) => any);
      filterIcon?: string | ((props: { filterOpened: boolean }) => any);
    };
```

### RendererType

每个值都包含“字符串”和“对象”类型，对象类型用于自定义配置，例如：

```ts
{
  renderer: 'longtext';
}
```

```ts
{
  renderer: {
    type: 'longtext',
    props: {
      rows: 2
    }
  }
}
```

#### text

原样输出文本。

#### date

格式化为 `YYYY-MM-DD`。

#### datetime

格式化为 `YYYY-MM-DD HH:mm:ss`。

#### media

使用 `RaMediaCard` 组件渲染。

| 参数  | 描述                 | 类型             |
| ----- | -------------------- | ---------------- |
| props | 自定义组件的 `props` | RaMediaCardProps |

#### tag

使用 `ElTag` 组件渲染。

| 参数  | 描述                                    | 类型               |
| ----- | --------------------------------------- | ------------------ |
| path  | 使用 `lodash` 的 `get` 函数获取嵌套数据 | string \| string[] |
| props | 自定义组件的 `props`                    | ElTagProps         |

#### longtext

使用 `RaLongText` 组件渲染。

| 参数  | 描述                 | 类型            |
| ----- | -------------------- | --------------- |
| props | 自定义组件的 `props` | RaLongTextProps |

#### switch

使用 `ElSwitch` 组件渲染。

| 参数  | 描述                 | 类型                                    |
| ----- | -------------------- | --------------------------------------- |
| api   | 更新数据接口         | (value: any, row: any) => Promise\<any> |
| props | 自定义组件的 `props` | SwitchProps                             |
