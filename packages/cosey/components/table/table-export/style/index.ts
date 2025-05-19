import { type CSSObject } from '../../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../../theme';

export interface ComponentToken {}

export interface TableExportToken extends FullToken<'TableExport'> {}

const getTableExportStyle: GenerateStyle<TableExportToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: token.colorBgContainer,

      [`${componentCls}-list`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: token.sizeXXS,

        [`${componentCls}-list`]: {
          marginInlineStart: token.marginLG,
        },
      },

      [`${componentCls}-list-item`]: {
        display: 'flex',
        alignItems: 'center',
      },
    },
  };
};

export default getStyleHook('TableExport', (token) => {
  return [getTableExportStyle(token)];
});
