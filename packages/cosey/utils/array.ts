import { omit } from 'lodash-es';

/**
 * 移动数组元素，并返回此数组，会改变原数组
 */
export function arrayMove<T extends any[]>(arr: T, fromIndex: number, toIndex: number) {
  if (fromIndex === toIndex) {
    return arr;
  }
  const fromEl = arr[fromIndex];
  arr.splice(toIndex + (fromIndex < toIndex ? 1 : 0), 0, fromEl);
  arr.splice(fromIndex + (fromIndex < toIndex ? 0 : 1), 1);
  return arr;
}

/**
 * 将传入的值转换为数组
 */
export function toArray<T>(target: T | T[]): T[] {
  return Array.isArray(target) ? target : [target];
}

/**
 * 判断两数组元素是否一致
 */
export function isShallowEqual(arr1: unknown[], arr2: unknown[]) {
  return arr1.length === arr2.length && arr1.every((item, i) => item === arr2[i]);
}

/**
 * 移除数组对象中的唯一键
 */
export function omitUniqueKey<T extends object>(arr: T[], key = '_uniqid') {
  return arr.map((item) => {
    return omit(item, key);
  });
}
