# Highlight 代码高亮

## 简介

把 `highlight.js` 封装成了 vue 组件，简化代码高亮的使用。

### 基础使用

使用 `code` 属性设置代码，使用 `lang` 属性设置代码语言。

::: demo

highlight/basic

:::

## API

### HighlightProps

| 属性       | 描述                   | 类型                                                                  | 默认值 |
| ---------- | ---------------------- | --------------------------------------------------------------------- | ------ |
| code       | 图标名称               | string                                                                | -      |
| lang       | 图标尺寸               | 'xml' \| 'json' \| 'js' \| 'ts' \| 'txt' \| 'css' \| 'scss' \| 'less' | 'txt'  |
| max-height | 设置滚动元素的最大高度 | string                                                                | -      |
