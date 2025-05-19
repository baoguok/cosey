/**
 * 获取路径的最后一部分
 */
export function getBasename(path: string) {
  return path.split('/').pop() || '';
}

/**
 * 获取路径的扩展名
 */
export function getExtname(path: string) {
  const basename = getBasename(path);
  if (basename.includes('.')) {
    return basename.split('.').pop() || '';
  }
  return '';
}
