/**
 * 生成全局唯一标识符
 */
export function uuid() {
  return (~~(Math.random() * 1e9)).toString(36);
}

/**
 * 生成唯一ID，用于设置元素的选择器
 */
export function uniqid(prefix = 'co-') {
  return prefix + uuid();
}
