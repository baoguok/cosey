import { ElLoading } from 'element-plus';
import { isEmpty } from './is';

/**
 * 发送到服务器之前，过滤掉查询表单中为空的数据，包括空数组和空字符串
 */
export function filterEmptyFormValue(model: Record<string, any>) {
  return Object.fromEntries(Object.entries(model).filter(([, value]) => !isEmpty(value)));
}

export function createLoading(selector: string) {
  return ElLoading.service({
    target: document.querySelector(selector) as HTMLElement,
  });
}
