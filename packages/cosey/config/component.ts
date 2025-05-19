/**
 * 组件默认全局配置
 */
export default {
  table: {
    keys: {
      /**
       * 响应数据对象中“列表数据”的 key
       */
      list: 'list',

      /**
       * 响应数据对象中“总记录数”的 key
       */
      total: 'total',

      /**
       * 请求url查询参数中“当前页数”的参数名
       */
      page: 'page',

      /**
       * 请求url查询参数中“每页条数”的参数名
       */
      pageSize: 'pageSize',

      /**
       * 请求url查询参数中“排序列”的参数名
       */
      orderBy: 'orderBy',

      /**
       * 请求url查询参数中“排序方向”的参数名
       */
      orderType: 'orderType',

      /**
       * 排序方向中“升序”的值
       */
      asc: 'asc',

      /**
       * 排序方向中“降序”的值
       */
      desc: 'desc',
    },
  },
};
