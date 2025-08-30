import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface TableActionToken extends FullToken<'TableAction'> {}

const getTableActionStyle: GenerateStyle<TableActionToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'inline-flex',
      flexDirection: 'column',
      rowGap: token.sizeSM,

      [`${componentCls}-row`]: {
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: token.sizeXXS,
        rowGap: token.sizeXXS,
      },
    },
  };
};

export default getStyleHook('TableAction', (token) => {
  return [getTableActionStyle(token)];
});
