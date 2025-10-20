import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoPanelWeekRange', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {
      width: 860,

      [`${componentCls}-header`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
      },
      [`${componentCls}-header-label`]: {
        fontSize: token.fontSizeLG,
        fontWeight: 500,
        paddingInline: 5,
        color: token.colorText,
      },
      [`${componentCls}-icon-btn`]: {
        paddingBlock: 1,
        paddingInline: 6,
        border: 0,
        fontSize: token.fontSizeSM,
        lineHeight: 1,
        color: token.colorText,
        background: 'transparent',
        cursor: 'pointer',
        outline: 'none',

        '&:hover': {
          color: token.colorPrimary,
        },
      },
      [`${componentCls}-content`]: {
        marginInline: 15,
        marginBlockEnd: 15,
      },

      table: {
        tableLayout: 'fixed',
        width: '100%',
        fontSize: token.fontSizeSM,
        borderCollapse: 'collapse',
      },

      td: {
        paddingBlock: 3,
        textAlign: 'center',
        cursor: 'pointer',

        '&.is-start': {
          [`${componentCls}-cell`]: {
            borderStartStartRadius: 9999,
            borderEndStartRadius: 9999,
          },
        },

        '&.is-end': {
          [`${componentCls}-cell`]: {
            borderStartEndRadius: 9999,
            borderEndEndRadius: 9999,
          },
        },

        '&.is-start, &.is-end': {
          [`${componentCls}-cell-text`]: {
            color: token.colorWhite,
            background: token.colorPrimary,
          },
        },

        '&.in-range': {
          [`${componentCls}-cell`]: {
            background: token.colorBorderSecondary,
          },
        },
      },

      [`${componentCls}-cell`]: {
        paddingBlock: 6,
      },

      [`${componentCls}-cell-text`]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
        marginInline: 6,
        borderRadius: 9999,
        lineHeight: 1.15,
        color: token.colorText,

        '&:hover': {
          color: token.colorPrimary,
        },
      },
    },
  };
});
