import { isEmpty } from '../../utils';

/**
 * 发送到服务器之前，过滤掉查询表单中为空的数据，包括空数组和空字符串
 */
export function filterEmptyFormValue(model: Record<string, any>) {
  return Object.fromEntries(Object.entries(model).filter(([, value]) => !isEmpty(value)));
}
