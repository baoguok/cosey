# FormDialog 对话框表单

## 简介

`RaFormDialog` 是 `ElDialog` 组件的高阶组件，拥有相同的接口，用于配合 `RaForm` 组件使用，`RaForm` 表单的按钮会移到 `RaFormDialog` 的底部插槽位置。

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

### RaFormDialogProps

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/dialog.html#attributes">Dialog Attributes</a>，还支持以下属性：

| 属性          | 描述             | 类型        | 默认值 |
| ------------- | ---------------- | ----------- | ------ |
| confirm-text  | 确定按钮的文案   | string      | '确定' |
| cancel-text   | 取消按钮的文案   | string      | '取消' |
| confirm-props | 确定按钮的属性   | ButtonProps | -      |
| cancel-props  | 取消按钮的属性   | ButtonProps | -      |
| hide-confirm  | 是否隐藏确定按钮 | boolean     | false  |
| hide-cancel   | 是否隐藏取消按钮 | boolean     | false  |

### RaFormDialogSlots

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/dialog.html#slots">Dialog Slots</a>，还支持以下插槽。

| 插槽   | 描述           | 属性                                                                            |
| ------ | -------------- | ------------------------------------------------------------------------------- |
| button | 自定义表单按钮 | { submitting: boolean; confirm: () => any \| Promise\<any>; cancel: () => any;} |

### RaFormDialogEmits

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/dialog.html#events">Dialog Events</a>。

### RaFormDialogExpose

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/dialog.html#exposes">Dialog Exposes</a>。

### useUpsert

```ts
function useUpsert<T extends Record<string, any>, R extends Record<string, any> = T>(
  options: UseUpsertOptions<T, R>,
): {
  dialogProps: {
    modelvalue: boolean;
    'onUpdate:modelValue': (value: boolean) => void;
    title: string;
  };
  formProps: {
    model: T;
    ref: string;
    submit: () => Promise<void>;
  };
  formRef: any;
  expose: UseUpsertExpose<R>;
} & UseUpsertExpose<R>;

interface UseUpsertOptions<T, R = T> {
  title?: string;
  stuffTitle?: string;
  model: T;
  show?: <U extends UpsertType>(type: U, row: U extends 'edit' ? R : undefined) => any;
  beforeFill?: (row: R) => any;
  add?: () => any;
  edit?: () => any;
  details?: () => any;
  onSuccess?: () => any;
  addSuccessText?: string;
  editSuccessText?: string;
}

interface UseUpsertExpose<R extends Record<string, any>> {
  edit: (row: R) => any;
  add: () => any;
  setOptions: (options: UseUpsertExposeOptions) => any;
}
```

### useOuterUpsert

```ts
function useOuterUpsert<R extends Record<string, any>>(
  options: UseExternalUpsertOptions,
): {
  add: () => void;
  edit: (row: R) => void;
  expose: Readonly<ShallowRef<UseUpsertExpose<R> | null>>;
  ref: string;
};

interface UseExternalUpsertOptions {
  onSuccess?: () => any;
}
```
