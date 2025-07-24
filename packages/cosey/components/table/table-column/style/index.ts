import { type CSSObject } from '../../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../../theme';

export interface ComponentToken {}

export interface TableColumnToken extends FullToken<'TableColumn'> {}

const getTableColumnStyle: GenerateStyle<TableColumnToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&.is-media, &.is-tag': {
        '.cell': {
          textOverflow: 'initial',
        },
      },
      [`${componentCls}-label`]: {
        verticalAlign: 'middle',
      },
    },
  };
};

export default getStyleHook('TableColumn', (token) => {
  return [getTableColumnStyle(token)];
});
