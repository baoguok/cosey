import { isClient } from './env';

export function insertCSS(styleStr: string, styleId?: string) {
  const style = document.createElement('style');
  style.innerHTML = styleStr;
  if (styleId) {
    style.setAttribute('data-id', styleId);
  }
  document.head.appendChild(style);
  return style;
}

export function findCSSNode(styleId: string) {
  return document.querySelector(`[data-id="${styleId}"]`);
}

export function updateCSS(styleStr: string, styleId: string) {
  if (isClient()) {
    const style = findCSSNode(styleId);
    if (style) {
      style.innerHTML = styleStr;
      return style;
    } else {
      return insertCSS(styleStr, styleId);
    }
  }
}

export function removeCSS(styleId: string) {
  const style = findCSSNode(styleId);
  if (style) {
    style.remove();
  }
}
