import type { CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';
import { rowColumns, rowSizes, type RowSize } from '../../row';

export interface ComponentToken {}

export interface ColToken extends FullToken<'Col'> {}

export const getColSizeStyle = (token: ColToken, size: RowSize | null): CSSObject => {
  const { componentCls } = token;

  return Array(rowColumns)
    .fill(0)
    .map((_, i): CSSObject => {
      i += 1;
      const sizeFrag = size === null ? '' : `${size}-`;
      const prefixCls = size === null ? componentCls : `${componentCls}-${size}${componentCls}`;

      return {
        [`${prefixCls}-${sizeFrag}${i}`]: {
          display: i === 0 ? 'none' : 'block',
          maxWidth: (1 / rowColumns) * i * 100 + '%',
          flex: `0 0 ${(1 / rowColumns) * i * 100 + '%'}`,

          '&-guttered': {
            display: i === 0 ? 'none' : 'block',
          },
        },

        [`${prefixCls}-${sizeFrag}offset-${i}`]: {
          marginInlineStart: (1 / rowColumns) * i * 100 + '%',
        },

        [`${prefixCls}-${sizeFrag}pull-${i}`]: {
          position: 'relative',
          insetInlineEnd: (1 / rowColumns) * i * 100 + '%',
        },

        [`${prefixCls}-${sizeFrag}push-${i}`]: {
          position: 'relative',
          insetInlineEnd: (1 / rowColumns) * i * 100 + '%',
        },
      };
    })
    .reduce((mergedCssbject, cssbject) => {
      return {
        ...mergedCssbject,
        ...cssbject,
      };
    }, {});
};

const getColStyle: GenerateStyle<ColToken, CSSObject> = (token) => {
  const { componentCls } = token;

  const sizes: (RowSize | null)[] = [null, ...rowSizes];

  return {
    [componentCls]: {
      position: 'relative',
      boxSizing: 'border-box',
    },
    ...sizes.reduce((obj, size) => {
      return {
        ...obj,
        ...getColSizeStyle(token, size),
      };
    }, {}),
  };
};

export default getStyleHook('Col', (token) => {
  return [getColStyle(token)];
});
