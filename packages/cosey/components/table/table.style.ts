import { type CSSObject } from '../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../theme';
import { contrarotation } from '../style';

export interface ComponentToken {}

export interface TableToken extends FullToken<'Table'> {
  tableHeaderBg: string;
}

const getTableStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: token.colorBgContainer,

      '&.is-fullpage': {
        position: 'fixed',
        inset: '0 !important',
        width: '100% !important',
        height: '100% !important',
      },

      [`${componentCls}-header`]: {
        flex: 'none',
        paddingInline: token.paddingSM,
        paddingBlockStart: token.size,
      },

      [`${componentCls}-body`]: {
        display: 'flex',
        minHeight: 0,
        flex: 1,
        flexDirection: 'column',
      },

      [`${componentCls}-toolbar`]: {
        display: 'flex',
        flex: 'none',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBlockStart: token.paddingSM,
        paddingInline: token.paddingSM,
      },

      [`${componentCls}-toolbar-left`]: {},

      [`${componentCls}-toolbar-right`]: {
        marginInlineStart: 'auto',
      },

      [`${componentCls}-toolbar-preset`]: {
        display: 'flex',
        gap: token.sizeXS,
      },

      [`${componentCls}-refresh-icon`]: {
        '&.is-spinning': {
          animationName: contrarotation,
          animationDuration: '0.6s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        },
      },

      [`${componentCls}-stats-wrapper`]: {
        paddingBlockStart: token.paddingSM,
      },

      [`${componentCls}-before-table`]: {
        paddingBlockStart: token.paddingSM,
        paddingInline: token.paddingSM,
      },

      [`${componentCls}-table`]: {
        minHeight: 0,
        flex: 1,
        padding: token.paddingSM,

        'th.el-table__cell': {
          backgroundColor: `${token.tableHeaderBg} !important`,
        },
      },

      [`${componentCls}-pagination`]: {
        flex: 'none',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        paddingBlockEnd: token.paddingSM,
        paddingInline: token.paddingSM,
      },
    },
  };
};

export default getStyleHook('Table', (token) => {
  const tableToken: TableToken = {
    ...token,
    tableHeaderBg: token.colorFillQuaternary,
  };

  return [getTableStyle(tableToken)];
});
