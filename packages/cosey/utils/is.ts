/**
 * 判断是否为纯对象
 */
export function isPlainObject(target: any): target is Record<PropertyKey, any> {
  return Object.prototype.toString.call(target) === '[object Object]';
}

/**
 * 判断是否为对象
 */
export function isObject(target: any): target is Record<PropertyKey, any> {
  return target !== null && typeof target === 'object';
}

/**
 * 判断是否为函数
 */
export function isFunction(target: any): target is (...args: any[]) => any {
  return typeof target === 'function';
}

/**
 * 判断是否为字符串
 */
export function isString(target: any): target is string {
  return typeof target === 'string';
}

/**
 * 判断是否为数值
 */
export function isNumber(target: any): target is number {
  return typeof target === 'number';
}

/**
 * 判断是否为布尔值
 */
export function isBoolean(target: any): target is boolean {
  return typeof target === 'boolean';
}

/**
 * 判断是否为 undefined
 */
export function isUndefined(target: any): target is undefined {
  return target === undefined;
}

/**
 * 判断是否为 null 或者 undefined
 */
export function isNullish(target: any): target is null | undefined {
  return target === null || target === undefined;
}

/**
 * 判断是否为原始类型
 */
export function isPrimitive(target: any): target is string | number | boolean {
  return isString(target) || isNumber(target) || isBoolean(target);
}

/**
 * 判断是否为空，包括空数组和空字符串
 */
export function isEmpty(target: any) {
  return isNullish(target) || target === '' || (Array.isArray(target) && target.length === 0);
}
