import { cloneDeep, omit } from 'lodash-es';

type OmitUndefined<T> = {
  [key in keyof T]: T[key] extends undefined ? never : T[key];
};

/**
 * 移除对象中值为 undefined 的属性
 */
export function omitUndefined<T extends object, U = OmitUndefined<T>>(object: T) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined)) as U;
}

/**
 * 接收一个字符串数组和一个任意类型的值，返回一个对象，其键由数组元素确定，值均为传入的第二个参数
 */
export function initObject<Keys extends readonly string[], Value>(keys: Keys, initValue: Value) {
  return keys.reduce(
    (obj, key) => {
      obj[key as Keys[number]] = initValue;
      return obj;
    },
    {} as Record<Keys[number], Value>,
  );
}

/**
 * 将对象的所有属性都设置为同一个指定的值
 */
export function uniformAssign<T extends object, Value>(object: T, value: Value) {
  return Object.assign(object, initObject(Object.keys(object), value));
}

/**
 * 创建一个对象，由两对象相减得到。
 */
export function omitObject<T extends object, U extends object>(
  object: T,
  another: U,
): Pick<T, Exclude<keyof T, keyof U>> {
  return omit(object, Object.keys(another) as unknown as keyof U);
}

/**
 * Object.assign 的深度操作，可以被 undefined 覆盖。
 */
export function deepAssign<TObject extends object, TSource extends object>(
  object: TObject,
  source: TSource,
): TObject & TSource;

export function deepAssign<
  TObject extends object,
  TSource1 extends object,
  TSource2 extends object,
>(object: TObject, source1: TSource1, source2: TSource2): TObject & TSource1 & TSource2;

export function deepAssign<
  TObject extends object,
  TSource1 extends object,
  TSource2 extends object,
  TSource3 extends object,
>(
  object: TObject,
  source1: TSource1,
  source2: TSource2,
  source3: TSource3,
): TObject & TSource1 & TSource2 & TSource3;

export function deepAssign<TObject extends object, TSourceList extends object[]>(
  object: TObject,
  ...sourceList: TSourceList
) {
  sourceList.forEach((source) => {
    Object.keys(source).forEach((key) => {
      const sValue = source[key as keyof typeof source];
      object[key as keyof TObject] = cloneDeep(sValue);
    });
  });

  return object as TObject & TSourceList[number];
}
