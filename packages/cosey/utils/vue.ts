import { createVNode, defineComponent, SlotsType, type VNodeChild } from 'vue';

/**
 * 使在 script setup 中也能使用 jsx
 */
export function defineTemplate(callback: (h: typeof createVNode) => VNodeChild) {
  return {
    render() {
      return callback(createVNode);
    },
  };
}

/**
 * 限定虚拟 DOM 的更新范围
 */
export const Scope = defineComponent({
  slots: Object as SlotsType<{ default: () => void }>,
  setup(_, { slots }) {
    return () => slots.default();
  },
});

/**
 * 用于高阶组件的接口暴露
 * 合并多个组件的 expose，也可以自定义额外的 expose
 * 可使用扩展运算符，但非函数值也要通过函数调用获取
 */
export function createMergedExpose<T = any>(
  keys: string[],
  ...exposeList: ((() => object) | object)[]
) {
  const result = {} as T;

  for (const key of keys) {
    (result as any)[key] = (...args: any[]) => {
      for (const expose of exposeList) {
        const obj = typeof expose === 'function' ? expose() : expose;
        if (obj && key in obj) {
          const value = obj[key];
          if (typeof value === 'function') {
            return obj[key](...args);
          }
          return value;
        }
      }
    };
  }

  return result;

  // return new Proxy(
  //   keys.reduce(
  //     (obj, key) => ((obj[key] = undefined), obj),
  //     {} as Record<string, any>,
  //   ),
  //   {
  //     get: (_, key: string) => {
  //       for (const expose of exposeList) {
  //         const obj = typeof expose === 'function' ? expose() : expose;
  //         if (obj && key in obj) {
  //           let value = obj[key];
  //           if (typeof value === 'function') {
  //             value = value.bind(obj);
  //           }
  //           return value;
  //         }
  //       }
  //     },
  //   },
  // ) as T;
}

/**
 * 如果值为空时展示占位符，否则显示值
 */
export function addNullablePlaceholder<T = unknown>(
  value: T,
  converter?: (value: NonNullable<T>) => any,
) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  return (converter ? converter(value) : value) as string;
}
