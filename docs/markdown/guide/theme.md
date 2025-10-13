# 主题

Cosey 提供了以设置组件属性的方式自定义主题。

可通过 `RootConfigProvider` 组件 `theme` 属性设置主题色：

```vue
<RootConfigProvider
  :theme="{
    token: {
      colorPrimary: '#0959C9',
      colorSuccess: '#3B960E',
      colorWarning: '#CD8C09',
      colorError: '#AB1415',
    },
  }"
>
  <router-view></router-view>
</RootConfigProvider>
```

设置了主题色后，其梯度色会自动生成。

## 演示

<component-theme />
