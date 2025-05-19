# MediaCard 媒体卡片

## 简介

媒体容器，通过点击进行弹窗查看，支持的媒体有图片、视频、音频。

## 代码演示

### 基础使用

给定一个 `src` 属性，内部会根据其后缀渲染对应媒体卡片。

::: demo

media-card/basic

:::

### 尺寸

预设了几个默认尺寸来保持一致性。

::: demo

media-card/size

:::

## API

### RaMediaCardProps

| 属性  | 描述                                                 | 类型                                      | 默认值    |
| ----- | ---------------------------------------------------- | ----------------------------------------- | --------- |
| src   | 媒体链接                                             | string                                    | -         |
| size  | 媒体尺寸                                             | 'mini' \| 'small' \| 'default' \| 'large' | 'default' |
| name  | 媒体文件名，在 audio 卡片中会替代从url中提取的文件名 | string                                    | -         |
| type  | 媒体类型，如果url中没有后缀则可手动指定              | 'image' \| 'video' \| 'audio'             | -         |
| title | 鼠标移上去显示的标题                                 | string                                    | -         |

### RaMediaCardExpose

| 属性 | 描述         | 类型       |
| ---- | ------------ | ---------- |
| view | 显示弹窗查看 | () => void |
