/**
 * 获取对象数组中指定的 label，可获取单个或一组 label。
 */
export function getLabelByValue(
  options: { [key: PropertyKey]: any }[],
  value: unknown,
  keys: {
    label: string;
    value: string;
  } = {
    label: 'label',
    value: 'value',
  },
) {
  if (Array.isArray(value)) {
    return value.map((item) => {
      return options.find((option) => option[keys.value] === item)?.[keys.label];
    });
  }
  return options.find((option) => option[keys.value] === value)?.[keys.label];
}

/**
 * 在树形结构数据中，根据 value 递归获取对应的 label 路径。
 */
export function getTreeLabelByValue(
  options: Record<string, unknown>[],
  value: unknown,
  keys: {
    label: string;
    value: string;
    children: string;
  },
) {
  const result: string[] = [];

  function recurArray(
    options: Record<string, unknown>[],
    value: unknown[],
    index: number,
    result: string[],
  ) {
    for (const option of options) {
      if (option[keys.value] === value[index]) {
        result.push(option[keys.label] as string);
        const children = option[keys.children];
        if (Array.isArray(children)) {
          recurArray(children, value, index + 1, result);
        }
        break;
      }
    }
  }

  function recur(options: Record<string, unknown>[], value: unknown, result: string[]) {
    for (const option of options) {
      if (option[keys.value] === value) {
        result.push(option[keys.label] as string);
        return true;
      }
      const children = option[keys.children];
      if (Array.isArray(children)) {
        const included = recur(children, value, result);
        if (included) {
          result.unshift(option[keys.label] as string);
          return true;
        }
      }
    }
  }

  if (Array.isArray(value)) {
    recurArray(options, value, 0, result);
  } else {
    recur(options, value, result);
  }
  return result;
}
