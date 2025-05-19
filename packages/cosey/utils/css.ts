import { kebabCase } from 'lodash-es';
import { type CSSProperties } from 'vue';
import { isNumber } from './is';

/**
 * 设置html元素样式
 */
export function setStyle(
  el: HTMLElement,
  style: {
    [key in keyof CSSProperties]: CSSProperties[key];
  },
) {
  for (const [key, value] of Object.entries(style)) {
    (el.style as any)[key] = value;
  }
}

/**
 * 获取元素当前计算的样式
 */
export function getStyle(el: HTMLElement, prop: keyof CSSStyleDeclaration) {
  return window.getComputedStyle(el)[prop];
}

/**
 * 获取元素内容盒子宽度
 */
export function getContextBoxWidth(el: HTMLElement) {
  return (
    el.clientWidth -
    parseFloat(getStyle(el, 'paddingLeft') as string) -
    parseFloat(getStyle(el, 'paddingRight') as string)
  );
}

/**
 * 用 js 对象的形式编写样式
 */
export function cssObjectToString(cssObject: {
  [selector: string]: {
    [key in keyof CSSProperties]: CSSProperties[key];
  };
}) {
  return Object.entries(cssObject)
    .map(([selector, style]) => {
      return `${selector}{${Object.entries(style)
        .map(([key, value]) => {
          return `${kebabCase(key.replace(/A-Z/g, (m) => '-' + m.toLowerCase()))}:${value}`;
        })
        .join(';')}}`;
    })
    .join('');
}

/**
 * 当值为数值时添加 px 单位
 */
export function addPxUnit(value: number | string | undefined) {
  return isNumber(value) ? value + 'px' : value;
}
