# Form 表单

## 简介

在原来的 `ElForm` 的基础上增加了一些语法糖和更多的布局设置，帮助我们快速地开发一个表单，同时添加了一些默认行为，让我们的表单默认好用。

分步表单、Modal 表单、Drawer 表单、查询表单、轻量筛选等多种 layout 可以覆盖大部分的使用场景，让我们脱离复杂而且繁琐的表单布局工作，用更少的代码完成更多的功能。

`RaForm` 没有黑科技，只是 `ElForm` 的封装，如果要使用自定义的组件可以用 `ElFormItem` 包裹后使用，支持混用。

## 何时使用 RaForm？

当你想快速实现一个表单但不想花太多时间去布局时 `RaForm` 是最好的选择。

`RaForm` 是基于 `ElForm` 的可降级封装，与 `element-plus` 功能完全对齐，但是在其之上还增加一些预设行为和多种布局。这些布局之间可以无缝切换，并且拥有公共的 API。

## 代码演示

### RaFormItem 表单项

一个表单除了 `Form` 之外还是需要一系列的表单项，`RaFormItem` 自带了数量可观的表单项，这些组件本质上是 `ElFormItem` 和表单组件的结合，我们可以把他们当成一个 `ElFormItem` 来使用，并且支持各种 `props`。每个表单项都支持 `field-type` 来指定组件类型，同时支持 `field-props` 属性来支持设置输入组件的 `props`。 我们支持 `v-model` 和 `placeholder` 等属性的透传。

下文把所有的输入组件统称为 `field`。

`ElFormItem + ElInput` 可以通过以下代码实现：

::: demo

form/form-item

:::

`field` 的插槽内容可以直接放在 `RaFormItem` 里面，根据设置的 `field-type` 值会自动推断出插槽的接口类型。

::: demo

form/form-item-slot

:::

#### field-props

`field` 的 `props` 和事件都可以通过 `field-props` 定义，事件名需要转换为以 `on` 开头紧跟大写字母的形式。
同插槽的使用，只要设置了 `field-type` ，便可以享受 `props` 的类型推断。

::: demo

form/field-props

:::

#### 提示信息

使用 `tooltip` 属性或插槽可以在标签右边显示icon，鼠标移上去会显示提示信息。

::: demo

form/form-item-tooltip

:::

#### 额外信息

使用 `extra` 属性或插槽可以在 `field` 下面显示额外信息。

::: demo

form/form-item-extra

:::

### RaFormGroup 表单组

`RaFormGroup` 在需要的时候用来将表单项组合在一起，可以实现自定义的表单布局。`RaFormGroup` 是 `ElSpace` 和 `ElDivider` 的结合，支持这两个组件的所有属性。

::: demo

form/form-group

:::

表单组还支持折叠功能，在一个大型表单中用于收纳暂不处理的一组表单项。

::: demo

form/collapsible-form-group

:::

### 基础表单

一个基础的表单除了表单项，还有提交、重置按钮，`RaForm` 内置了这些按钮，同时在提交时给提交按钮添加了加载效果。

::: demo

form/basic

:::

### 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

通过设置 inline 属性为 true 可以让表单域变为行内的表单域。

::: demo

form/inline

:::

### 等宽表单项

除了行内表单，也可以将所有表单项放到 `RaFormGroup` 组件里面，这同样起到行内的效果。

另外，可以在 `RaForm` 组件上设置 `label-width` 和 `width` 属性来统一让所有表单项的标签和控件宽度一致。

::: demo

form/same-width

:::

### 等宽行内表单

行内表单也可以统一设置标签和控件的宽度。

::: demo

form/same-width-inline

:::

### 标签位置

顶部标签可以让表单控件有更多的空间。

::: demo

form/label-position

:::

### 栅格化布局

栅格化布局可以让表单在父容器不同宽度下展示不同的列数。使用 `grid` 启动栅格化布局，使用 `row-props` 和 `col-props` 设置栅格间隔、列数等。

::: demo

form/grid

:::

### 所有表单项

下面演示了所有的表单项及其在只读状态下的展示。

::: demo

form/all-fields

:::

## API

### RaFormProps

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/form.html#form-attributes">Form Attributes</a> ，还支持以下属性。

| 属性         | 描述                                               | 类型                       | 默认值 |
| ------------ | -------------------------------------------------- | -------------------------- | ------ |
| width        | 统一设置 `field` 为固定宽度                        | RaFormItemWidth            | -      |
| grid         | 是否开启栅格化模式                                 | boolean                    | false  |
| row-props    | 栅格化模式下设置 `RaRow` 的属性                    | RaRowProps                 | -      |
| col-props    | 栅格化模式下设置所有 `field` 共同的 `RaCol` 的属性 | RaColProps                 | -      |
| readonly     | 设置表单内所有 `field` 为只读状态                  | boolean                    | false  |
| submit       | 提交表单时触发的回调                               | () => any \| Promise\<any> | -      |
| reset        | 重置表单时触发的回调                               | () => any                  | -      |
| submit-text  | 提交按钮的文案                                     | string                     | '提交' |
| reset-text   | 重置按钮的文案                                     | string                     | '重置' |
| submit-props | 提交按钮的属性                                     | ButtonProps                | -      |
| reset-props  | 重置按钮的属性                                     | ButtonProps                | -      |
| hide-submit  | 是否隐藏提交按钮                                   | boolean                    | false  |
| hide-reset   | 是否隐藏重置按钮                                   | boolean                    | false  |

### RaFormSlots

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/form.html#form-slots">Form Slots</a> ，还支持以下插槽。

| 插槽   | 描述           | 属性                                                                          |
| ------ | -------------- | ----------------------------------------------------------------------------- |
| button | 自定义表单按钮 | { submitting: boolean; submit: () => any \| Promise\<any>; reset: () => any;} |

### RaFormEmits

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/form.html#form-%E4%BA%8B%E4%BB%B6">Form 事件</a>。

### RaFormExpose

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/form.html#form-exposes">Form Exposes</a> ，还支持以下属性。

| 属性   | 描述     | 类型                |
| ------ | -------- | ------------------- |
| submit | 提交表单 | () => Promise\<any> |

### RaFormItemProps

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/form.html#formitem-attributes">FormItem Attributes</a> ，还支持以下属性。

| 属性                  | 描述                                                          | 类型                                                                                    | 默认值  |
| --------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------- |
| field-type            | `field` 的类型                                                | RaFieldType                                                                             | 'input' |
| field-props           | `field` 的 props                                              | RaMapFieldTypeComponentProps[RaFieldType]['componentProps']                             | -       |
| field-ref             | 获取 `field` 暴露的属性                                       | (el: any) => void                                                                       | -       |
| model-value / v-model | 绑定 `field` 的值                                             | NonNullable<RaMapFieldTypeComponentProps[RaFieldType]['componentProps']> ['modelValue'] | -       |
| width                 | 设置 `field` 为固定宽度                                       | RaFormItemWidth                                                                         | -       |
| placeholder           | 设置 `field` 占位符，仅对带有输入框的组件有效                 | string                                                                                  | -       |
| disabled              | 设置 `field` 为禁用状态                                       | boolean                                                                                 | false   |
| readonly              | 设置 `field` 为只读状态                                       | boolean                                                                                 | false   |
| col-props             | 当 `RaForm` 开启栅格化模式时可以设置其内 `RaCol` 组件的 props | RaColProps                                                                              | -       |
| tooltip               | 配置提示信息                                                  | VNodeChild                                                                              | -       |
| extra                 | 额外的提示信息                                                | VNodeChild                                                                              | -       |

### RaFormItemWidth

```ts
type RaFormItemWidth = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {});
```

在某些场景下，我们需要根据页面展示效果对输入框进行自适应处理，除此以外一个表单区域应默认使用定宽规则。

- `XS=104px` 适用于短数字、短文本或选项。
- `SM=216px` 适用于较短字段录入、如姓名、电话、ID 等。
- `MD=328px` 标准宽度，适用于大部分字段长度。
- `LG=440px` 适用于较长字段录入，如长网址、标签组、文件路径等。
- `XL=552px` 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。

### RaFormItemSlots

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/form.html#formitem-slots">FormItem Slots</a> ，以及对应 `field` 的插槽，还支持以下插槽。

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| tooltip | 配置提示信息   | -    |
| extra   | 额外的提示信息 | -    |

### RaFormItemEmits

| 事件               | 描述                   | 类型                     |
| ------------------ | ---------------------- | ------------------------ |
| update:model-value | `field` 的值改变时触发 | (value: unknown) => void |

### RaFormItemExpose

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/form.html#formitem-exposes">FormItem Exposes</a>。

### RaFormGroupProps

除了支持 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/space.html#attributes">Space Attributes</a> 和 <a target="_blank" href="https://element-plus.org/zh-CN/component/divider.html#attributes">Divider Attributes</a> ，还支持以下属性。

| 属性        | 描述               | 类型    | 默认值 |
| ----------- | ------------------ | ------- | ------ |
| title       | 设置表单组的标题   | string  | -      |
| collapsible | 是否允许折叠       | boolean | false  |
| collapsed   | 设置是否为折叠状态 | boolean | false  |

### RaFormGroupSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### RaFormGroupEmits

| 事件             | 描述               | 类型                         |
| ---------------- | ------------------ | ---------------------------- |
| update:collapsed | 折叠状态改变时触发 | (collapsed: boolean) => void |

### RaFieldType

#### autocomplete

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/autocomplete.html">ElAutocomplete</a> 组件。

#### cascader

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/cascader.html">ElCascader</a> 组件。

#### checkbox

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/checkbox.html#checkbox-api">ElCheckbox</a> 组件。

#### checkboxgroup

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/checkbox.html#checkboxgroup-api">ElCheckboxGroup</a> 组件。还支持以下额外属性，

| 属性           | 描述                          | 类型                                            | 默认值     |
| -------------- | ----------------------------- | ----------------------------------------------- | ---------- |
| options        | 使用配置对象来生成复选框      | (Partial\<CheckboxProps> \| string \| number)[] | -          |
| label-key      | 自定义 `options` 中标签的键名 | string                                          | 'label'    |
| value-key      | 自定义 `options` 中值的键名   | string                                          | 'value'    |
| type           | 设置复选框的类型              | 'button' \| 'checkbox'                          | 'checkbox' |
| checkbox-width | 设置复选框的宽度              | string \| number                                | -          |

#### color

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/color-picker.html">ElColorPicker</a> 组件。

#### date

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/date-picker.html">ElDatePicker</a> 组件。

#### daterange

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/date-picker.html">ElDatePicker</a> 组件。并预设了 `type="daterange"` 属性。

#### dates

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/date-picker.html">ElDatePicker</a> 组件。并预设了 `type="dates"` 属性。

#### datetime

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/date-picker.html">ElDatePicker</a> 组件。并预设了 `type="datetime"` 属性。

#### datetimerange

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/date-picker.html">ElDatePicker</a> 组件。并预设了 `type="datetimerange"` 属性。

#### input

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/input.html">ElInput</a> 组件。

#### inputtag

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/input-tag.html">ElInputTag</a> 组件。

#### mention

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/mention.html">ElMention</a> 组件。

#### month

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/date-picker.html">ElDatePicker</a> 组件。并预设了 `type="month"` 属性。

#### monthrange

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/date-picker.html">ElDatePicker</a> 组件。并预设了 `type="monthrange"` 属性。

#### months

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/date-picker.html">ElDatePicker</a> 组件。并预设了 `type="months"` 属性。

#### number

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/input-number.html">ElInputNumber</a> 组件。

#### password

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/input.html">ElInput</a> 组件。并预设了 `type="password"` 属性。

#### radiogroup

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/radio.html#radiogroup-api">ElRadioGroup</a> 组件。还支持以下额外属性。

| 属性      | 描述                          | 类型                                         | 默认值  |
| --------- | ----------------------------- | -------------------------------------------- | ------- |
| options   | 使用配置对象来生成单选按钮    | (Partial\<RadioProps> \| string \| number)[] | -       |
| label-key | 自定义 `options` 中标签的键名 | string                                       | 'label' |
| value-key | 自定义 `options` 中值的键名   | string                                       | 'value' |
| type      | 设置单选框的类型              | 'button' \| 'radio'                          | 'radio' |

#### segmented

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/segmented.html">ElSegmented</a> 组件。

#### select

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/select.html">ElSelect</a> 组件。还支持以下额外属性。

| 属性      | 描述                          | 类型                  | 默认值  |
| --------- | ----------------------------- | --------------------- | ------- |
| options   | 使用配置对象来生成选项        | RaFieldSelectOption[] | -       |
| label-key | 自定义 `options` 中标签的键名 | string                | 'label' |
| value-key | 自定义 `options` 中值的键名   | string                | 'value' |

```ts
type RaFieldSelectOption =
  | {
      label: string | number;
      value: string | number | boolean;
      disabled?: boolean;
    }
  | string
  | number
  | boolean;
```

#### slider

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/slider.html">ElSlider</a> 组件。

#### switch

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/switch.html">ElSwitch</a> 组件。

#### textarea

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/input.html">ElInput</a> 组件。并预设了 `type="textarea"` 属性。

#### time

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/time-picker.html">ElTimePicker</a> 组件。

#### timerange

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/time-picker.html">ElTimePicker</a> 组件。并预设了 `is-range` 属性。

#### timeselect

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/time-select.html">ElTimeSelect</a> 组件。

#### transfer

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/transfer.html">ElTransfer</a> 组件。

#### treeselect

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/tree-select.html">ElTreeSelect</a> 组件。

#### week

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/date-picker.html">ElDatePicker</a> 组件。并预设了 `type="week"` 属性。

#### year

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/date-picker.html">ElDatePicker</a> 组件。并预设了 `type="year"` 属性。

#### yearrange

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/date-picker.html">ElDatePicker</a> 组件。并预设了 `type="yearrange"` 属性。

#### years

同 `element-plus` 的 <a target="_blank" href="https://element-plus.org/zh-CN/component/date-picker.html">ElDatePicker</a> 组件。并预设了 `type="years"` 属性。
