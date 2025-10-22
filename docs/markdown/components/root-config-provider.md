# RootConfigProvider 根全局配置

根全局配置是 Coesy 中必须的全局单例的进行全局配置的组件。

## 主题配置

[参阅主题配置](../guide/theme)

## 表格配置

表格接口相关的 key 可通过此组件进行全局配置。

```vue
<RootConfigProvider
  :table="{
    keys: {
      list: 'list',
      total: 'total',
      page: 'page',
    },
  }"
>
  <router-view></router-view>
</RootConfigProvider>
```

更多表格配置可[参阅 TableConfig](./table#tableconfig)。

## API

### RootConfigProviderProps

| 属性         | 描述             | 类型                                                                                      | 默认值 |
| ------------ | ---------------- | ----------------------------------------------------------------------------------------- | ------ |
| theme        | 主题配置         | ThemeConfig                                                                               | -      |
| table        | 表格配置         | [TableConfig](./table#tableconfig)                                                        | -      |
| table-action | 表格操作按钮配置 | [TableActionConfig](./table#tableactionconfig)                                            | -      |
| locale       | 翻译文本对象     | object [Languages](https://github.com/sutras/cosey/tree/main/packages/cosey/locale/lang/) | -      |

#### ThemeConfig

```ts
interface ThemeConfig {
  token?: {
    colorPrimary?: string;
    colorSuccess?: string;
    colorWarning?: string;
    colorError?: string;
  };
}
```
