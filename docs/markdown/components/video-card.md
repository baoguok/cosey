# VideoCard 视频卡片

## 简介

视频卡片容器，点击可以弹窗预览。

## 代码演示

### 基础使用

基础使用

::: demo

video-card/basic

:::

## API

### VideoCardProps

| 属性                  | 描述                                | 类型                                      | 默认值    |
| --------------------- | ----------------------------------- | ----------------------------------------- | --------- |
| src                   | 视频地址                            | string                                    | -         |
| hide-on-click-modal   | 是否可以通过点击遮罩层关闭 viewer   | boolean                                   | false     |
| z-index               | 设置预览的 z-index                  | number                                    | -         |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 viewer    | boolean                                   | true      |
| teleported            | viewer 自身是否插入至 body 元素上。 | boolean                                   | false     |
| size                  | 视频容器大小                        | 'mini' \| 'small' \| 'default' \| 'large' | 'default' |

### VideoCardEmits

| 事件  | 描述              | 类型       |
| ----- | ----------------- | ---------- |
| close | viewer 关闭时触发 | () => void |
| show  | viewer 显示时触发 | () => void |
