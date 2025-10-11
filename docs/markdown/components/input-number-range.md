# InputNumberRange 数字范围输入框

## 简介

允许输入范围的两个值。

## 代码演示

### 基础使用

使用 `v-model` 绑定表示范围的数组值。

::: demo

input-number-range/basic

:::

## API

### InputNumberRangeProps

| 属性              | 描述                          | 类型     | 默认值 |
| ----------------- | ----------------------------- | -------- | ------ |
| model-value       | 绑定的范围值                  | number[] | -      |
| min               | 设置范围允许的最小值          | number   | -      |
| max               | 设置范围允许的最大值          | number   | -      |
| step              | 计数器步长                    | number   | -      |
| step-strictly     | 是否只能输入 step 的倍数      | boolean  | false  |
| precision         | 数值精度                      | number   | -      |
| start-placeholder | 开始输入框的 placeholder 属性 | string   | -      |
| end-placeholder   | 结束输入框的 placeholder 属性 | string   | -      |
| readonly          | 是否只读                      | boolean  | false  |
| disabled          | 是否禁用                      | boolean  | false  |
| validate-event    | 是否触发表单验证              | boolean  | true   |

### InputNumberRangeEmits

| 事件              | 描述               | 类型                                   |
| ----------------- | ------------------ | -------------------------------------- |
| update:modelValue | 绑定值被改变时触发 | (value: number[] \| undefined) => void |
| change            | 绑定值被改变时触发 | (value: number[] \| undefined) => void |
