# FormDialog 对话框表单

## 简介

`FormDialog` 是 `ElDialog` 组件的高阶组件，拥有相同的接口，用于配合 `Form` 组件使用，`Form` 表单的按钮会移到 `FormDialog` 的底部插槽位置。

## 代码演示

### 基础演示

::: demo

form-dialog/basic

:::

### useUpsert

可使用 `useUpsert` 来简化“新增/编辑”弹出框表单的使用。

::: demo

form-dialog/user-upsert

:::

### useOuterUpsert

“新增/编辑”弹出框表单一般放在单独的文件中，为了简化操作，可以使用 `useOuterUpsert` 函数。

::: demo

form-dialog/use-outer-upsert

:::

## API

### FormDialogProps

除了支持 `element-plus` 的 [Dialog Attributes](https://element-plus.org/zh-CN/component/dialog.html#attributes)，还支持以下属性：

| 属性          | 描述             | 类型        | 默认值 |
| ------------- | ---------------- | ----------- | ------ |
| confirm-text  | 确定按钮的文案   | string      | '确定' |
| cancel-text   | 取消按钮的文案   | string      | '取消' |
| confirm-props | 确定按钮的属性   | ButtonProps | -      |
| cancel-props  | 取消按钮的属性   | ButtonProps | -      |
| hide-confirm  | 是否隐藏确定按钮 | boolean     | false  |
| hide-cancel   | 是否隐藏取消按钮 | boolean     | false  |

### FormDialogSlots

除了支持 `element-plus` 的 [Dialog Slots](https://element-plus.org/zh-CN/component/dialog.html#slots)，还支持以下插槽。

| 插槽   | 描述           | 属性                                                                            |
| ------ | -------------- | ------------------------------------------------------------------------------- |
| button | 自定义表单按钮 | { submitting: boolean; confirm: () => any \| Promise\<any>; cancel: () => any;} |

### FormDialogEmits

同 `element-plus` 的 [Dialog Events](https://element-plus.org/zh-CN/component/dialog.html#events)。

### FormDialogExpose

同 `element-plus` 的 [Dialog Exposes](https://element-plus.org/zh-CN/component/dialog.html#exposes)。

### useUpsert

```ts
function useUpsert<
  Model extends Record<string, any>,
  Row extends Record<string, any> = Model,
  Data = any,
>(options: UseUpsertOptions<Model, Row>): UseUpsertReturn<Model, Row>;

interface UseUpsertOptions<Model, Row = Model, Data = Model> {
  title?: string;
  stuffTitle?: string;
  model: Model;
  show?: <T extends UpsertType, R extends T extends 'edit' ? Row : undefined>(
    type: T,
    row: R,
  ) => any;
  details?: (row: Row) => any;
  beforeFill?: (row: Row) => any;
  beforeSubmit?: (model: Model) => Data | Promise<Data>;
  add?: (data: Data) => any;
  edit?: (data: Data) => any;
  success?: (res: any) => any;
  addSuccessText?: string;
  editSuccessText?: string;
}

interface UseUpsertReturn<
  Model extends Record<string, any>,
  Row extends Record<string, any> = Model,
  Data = any,
> extends UseUpsertExpose<Row, Data> {
  dialogProps: {
    modelvalue: boolean;
    'onUpdate:modelValue': (value: boolean) => void;
    title: string;
  };
  formProps: {
    model: Model;
    ref: string;
    submit: () => Promise<void>;
  };
  formRef: any;
  data: Ref<Data | undefined>;
  expose: UseUpsertExpose<Row, Data>;
}

interface UseUpsertExpose<Row extends Record<string, any>, Data = any> {
  edit: (row: Row) => any;
  add: () => any;
  setData: (data: Data) => UseUpsertExpose<Row, Data>;
  setOptions: (options: UseUpsertExposeOptions) => any;
}

interface UseUpsertExposeOptions {
  success?: () => any;
}
```

### useOuterUpsert

```ts
function useOuterUpsert<Row extends Record<string, any>, Data>(
  options: UseExternalUpsertOptions,
): UseExternalUpsertReturn<Row, Data>;

interface UseExternalUpsertOptions {
  success?: () => any;
}

interface UseExternalUpsertReturn<Row extends Record<string, any>, Data> {
  add: () => void;
  edit: (row: Row) => void;
  setData: (data: Data) => void;
  expose: Readonly<ShallowRef<UseUpsertExpose<Row, Data> | null>>;
  ref: string;
}
```
