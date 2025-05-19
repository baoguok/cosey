# Upload 上传

## 简介

通过点击上传文件，封装了上传逻辑、双向绑定和表单验证，使其像 ElInput 一样易用。

## 代码演示

### 基础使用

使用 `v-model` 进行双向绑定，内容使用 `singleUpload()` 函数上传文件并接收返回的 url，可根据具体接口修改 `singleUpload()` 的返回值。

::: demo

upload/basic

:::

### 最大上传数量

使用 `limit` 属性限制上传的最大文件数量，达到最大数量会隐藏选择按钮，超出最大数量会显示警告提示。

::: demo

upload/limit

:::

### 单一值

使用 `single` 属性可绑定一个单一值，而不是数组。

::: demo

upload/single

:::

### 仅选择

使用 `select-only` 属性仅选择文件，而不上传。

::: demo

upload/select-only

:::

## API

### RaUploadProps

| 属性           | 描述                                                         | 类型                                      | 默认值    |
| -------------- | ------------------------------------------------------------ | ----------------------------------------- | --------- |
| accept         | 允许选择的文件类型                                           | string                                    | ''        |
| limit          | 允许上传文件的最大数量，0表示无限制                          | number                                    | 0         |
| multiple       | 是否支持多选文件                                             | boolean                                   | false     |
| model-value    | 绑定的值                                                     | string \| File \| (string \ File)[]       | -         |
| validate-event | 是否触发表单验证                                             | boolean                                   | true      |
| single         | 是否只绑定一个值（`string` 或 `File`，而非数组）             | boolean                                   | false     |
| readonly       | 是否只读                                                     | boolean                                   | -         |
| disabled       | 是否禁用                                                     | boolean                                   | -         |
| action         | 请求 `URL`                                                   | string                                    | '/upload' |
| select-only    | 仅选择文件，将其和其他表单项一并交由表单通过 `FormData` 上传 | boolean                                   | false     |
| size           | 列表项的尺寸                                                 | 'mini' \| 'small' \| 'default' \| 'large' | 'default' |

### RaUploadSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### RaUploadEmits

| 事件               | 描述               | 类型                                                  |
| ------------------ | ------------------ | ----------------------------------------------------- |
| exceed             | 当超出限制时触发   | () => void                                            |
| update:model-value | 绑定的值改变时触发 | (value: string \| File \| (string \| File)[]) => void |
| change             | 绑定的值改变时触发 | (value: string \| File \| (string \| File)[]) => void |
