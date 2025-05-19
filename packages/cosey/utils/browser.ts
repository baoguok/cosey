/**
 * 返回当前操作系统的 Control 键
 */
export function getControlKey() {
  return /Mac OS/i.test(navigator.userAgent) ? '⌘' : 'Ctrl';
}
