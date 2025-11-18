# 文件上传

Cosey 的 `Upload` 和 `Editor` 组件涉及到文件上传，因此需要提供一个上传接口供其调用。

```ts
import commonApi from '@/api/common';

launch(app, {
  api: {
    upload: commonApi.singleUpload,
  },
});
```

上传接口需是返回文件路径的字符串。
