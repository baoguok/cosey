/**
 * URL.canParse() 静态方法的兼容实现
 */
export function canParseUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
