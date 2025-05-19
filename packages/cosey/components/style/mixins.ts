import type { CSSObject } from '../cssinjs';
import { AliasToken } from '../theme';

export function getLineClampStyle(lineClamp: number): CSSObject {
  return {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitLineClamp: lineClamp,
    WebkitBoxOrient: 'vertical',
  };
}

export function getTruncateStyle(): CSSObject {
  return {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  };
}

export function getFocusVisibleStyle(token: AliasToken): CSSObject {
  return {
    '&:focus-visible': {
      outline: `2px solid ${token.colorPrimaryHover}`,
      outlineOffset: 1,
      transition: `outline-offset 0s, outline 0s`,
    },
  };
}
