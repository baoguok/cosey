export function formDataToObject(formData: FormData) {
  const obj: Record<string, any> = {};
  for (const key of (formData as any).keys()) {
    if (key in obj) {
      let value = obj[key];
      if (!Array.isArray(value)) {
        value = [value];
      }
      value.push(formData.get(key));
    } else {
      obj[key] = formData.get(key);
    }
  }
  return obj;
}

export function searchParamsToObject(params: URLSearchParams) {
  const obj: Record<string, string | string[]> = {};
  for (const param of [...params]) {
    let key = param[0];
    const value = param[1];
    const isArray = /\[\]$/.test(key);

    if (isArray) {
      key = key.slice(0, -2);
    }

    if (key in obj) {
      const val = obj[key];
      if (Array.isArray(val)) {
        val.push(value);
      } else {
        obj[key] = value;
      }
    } else {
      obj[key] = isArray ? [value] : value;
    }
  }
  return obj;
}

export function logError(error: Error) {
  console.error(`[RequestInterceptor]`, error);
}
