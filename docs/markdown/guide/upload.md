# 文件上传

Cosey 的 `Upload` 和 `Editor` 组件涉及到文件上传，因此需要提供一个上传接口供其调用。

```ts
import { useUploadApi } from '@/api/common';

createCosey({
  api: {
    upload: () => {
      return useUploadApi().singleUpload;
    },
  },
});
```

上传接口需是返回文件路径的字符串。
