/**
 * 返回当前操作系统的 Control 键
 */
export function getControlKey() {
  return IS_APPLE ? '⌘' : 'Ctrl';
}

export const IS_APPLE = typeof navigator !== 'undefined' && /Mac OS X/.test(navigator.userAgent);
