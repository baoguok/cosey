# 接口请求

cosey 对 `axios` 进行了封装，对外提供了 `useRequest` 钩子来创建接口发送请求。使用钩子的考量有二。一是可以借助钩子消费上下文数据；二是每次都能生成新的请求对象，使其可以处理当前接口请求的终止。

## 定义接口

通常接口根据不同模块存放在不同的文件中，例如博客模块的接口，就可以这样存放和定义：

```ts
// `api/blog.ts`

import { useRequest } from 'cosey';

const Api = {
  PostsResource: '/blog/posts',
};

export const usePostsApi = () => {
  return useRequest().map({
    getPosts: (http) => (params?: any) => {
      return http.get(Api.PostsResource, {
        params,
      });
    },

    getPost: (http) => (id: number) => {
      return http.get(`${Api.PostsResource}/${id}`);
    },

    addPost: (http) => (data: any) => {
      return http.post(Api.PostsResource, data);
    },

    updatePost: (http) => (id: number, data: any) => {
      return http.patch(`${Api.PostsResource}/${id}`, data);
    },

    deletePost: (http) => (id: number) => {
      return http.delete(`${Api.PostsResource}/${id}`);
    },
  });
};
```

上面定义了博客模块的 RESTful 风格的接口。

`useRequest` 可接收 `CreateAxiosDefaults` 类型参数自定义请求；`useRequest().map` 方法可以定义相同配置下的一组方法，消费组件可将其扩展使用。

`http` 对象定义了多个和 axios 相同接口的方法。

## 使用接口

```ts
import { usePostsApi } from '@/api/blog';

const { getPosts } = usePostsApi();

onMounted(async () => {
  getPosts().then((data) => {
    console.log(data);
  });
});
```

## 终止请求

```ts
getPosts.abort();
```

## 接口配置

`createCosey` 配置项 `http` 用于接口相关的配置。

### baseURL

- 类型：`string`
- 默认值：`''`

基础url。

### timeout

- 类型：`number`
- 默认值：`20 * 1000`

请求超时时间，单位 ms。

### headers

- 类型：`Record<string, string>`
- 默认值：`{}`

自定义请求头。

### authScheme

- 类型：`string`
- 默认值：`'Bearer'`

HTTP 认证方案。

### path

#### path.code

- 类型：`string`
- 默认值：`'code'`

响应状态码属性的路径，通过 lodash.get 获取。

#### path.message

- 类型：`string`
- 默认值：`'message'`

响应信息属性的路径，通过 lodash.get 获取。

#### path.data

- 类型：`string`
- 默认值：`'data'`

响应数据对象属性的路径，通过 lodash.get 获取。

### code

#### code.success

- 类型：`number`
- 默认值：`200`

响应成功状态码。

#### code.unauthorized

- 类型：`number`
- 默认值：`401`

未认证状态码。

#### code.forbidden

- 类型：`number`
- 默认值：`403`

没权限状态码。

### errorDuration

- 类型：`number`
- 默认值：`3000`

错误提示显示时长，单位 ms。
