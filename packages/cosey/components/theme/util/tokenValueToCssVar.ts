import { kebabCase } from 'lodash-es';
import type { AliasToken, GlobalToken } from '../interface';
import { preserve } from './preserve';

export function tokenValueToCssVar(token: GlobalToken, prefix?: string) {
  const result: Record<string, any> = {};

  prefix = prefix ? prefix + '-' : '';

  Object.keys(token).forEach((key) => {
    result[key] = preserve[key as keyof AliasToken]
      ? token[key as keyof GlobalToken]
      : `var(--${prefix}${kebabCase(key)})`;
  });

  return result;
}
