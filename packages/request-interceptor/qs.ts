/**
 * 将查询字符串解析成对象形式
 */

export const qs = {
  parse(str: string) {
    const result: Record<string, string | string[]> = {};

    new URLSearchParams(str).forEach((value, key) => {
      if (result[key] !== undefined) {
        if (Array.isArray(result[key])) {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }
      } else {
        result[key] = value;
      }
    });

    return result;
  },
};
