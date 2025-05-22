# NumberFormat 数字格式化

## 简介

将数字格式化为指定格式，例如千分位或货币。

## 代码演示

### 基础使用

传递数字或字符串类型数字即可展示为千分位形式。

::: demo

number-format/basic

:::

### 百分比格式

设置 `type="percent"` 会格式化为百分比格式。

::: demo

number-format/percent

:::

### 货币

设置 `type="currency"` 展示为货币形式。

::: demo

number-format/currency

:::

### 动画

通过设置 `animate` ，每当值变更时，会从旧值滚动到新的值。

::: demo

number-format/animate

:::

## API

### NumberFormatProps

| 属性           | 描述                                                                                                        | 类型                                 | 默认值    |
| -------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------ | --------- |
| value          | 要展示的数值                                                                                                | number \| string                     | -         |
| precision      | 小数个数                                                                                                    | number                               | 0         |
| animate        | 是否动画                                                                                                    | boolean                              | false     |
| duration       | 动画持续时间，单位毫秒                                                                                      | number                               | 1500      |
| locales        | BCP 47 语言标签，[详见](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) | string                               | 'zh-Hans' |
| type           | 格式化样式                                                                                                  | 'currency' \| 'decimal' \| 'percent' | 'decimal' |
| currency       | 货币类型，[详见](https://github.com/unicode-org/cldr/blob/main/common/bcp47/currency.xml)                   | string                               | 'CNY'     |
| before-display | 在格式化后的值展示前进行处理                                                                                | (value: string) => string            | -         |
