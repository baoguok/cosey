# WeekRangePicker 周范围选择器

## 简介

简介

## 代码演示

### 基础使用

基础使用

::: demo

week-range-picker/basic

:::

## API

### WeekRangePickerProps

| 属性                  | 描述                          | 类型    | 默认值 |
| --------------------- | ----------------------------- | ------- | ------ |
| model-value (v-model) | 绑定的值                      | Date[]  | -      |
| start-placeholder     | 开始输入框的 placeholder 属性 | string  | -      |
| end-placeholder       | 结束输入框的 placeholder 属性 | string  | -      |
| readonly              | 是否只读                      | boolean | false  |
| disabled              | 是否禁用                      | boolean | false  |
| validate-event        | 是否触发表单验证              | boolean | true   |

### WeekRangePickerSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### WeekRangePickerEmits

| 事件              | 描述               | 类型                                 |
| ----------------- | ------------------ | ------------------------------------ |
| update:modelValue | 绑定值被改变时触发 | (value: Date[] \| undefined) => void |
| change            | 绑定值被改变时触发 | (value: Date[] \| undefined) => void |
