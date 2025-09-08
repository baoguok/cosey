import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('CoLayoutSearch', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-button`]: {
      padding: 0,

      [`${componentCls}-button-wrapper`]: {
        display: 'flex',
        height: 32,
        alignItems: 'center',
        paddingInline: token.paddingXS,
        borderRadius: 9999,
        backgroundColor: token.colorFillContent,
      },

      [`${componentCls}-button-text`]: {
        marginInlineStart: token.marginXS,
        fontSize: token.fontSizeSM,
      },

      [`${componentCls}-button-kbd`]: {
        marginInlineStart: token.marginXS,
        paddingInline: token.paddingXXS,
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeight,
        borderRadius: token.borderRadiusSM,
        border: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,
        backgroundColor: token.colorBgContainer,
      },
    },

    [componentCls]: {
      maxWidth: '90%',

      [`${componentCls}-input`]: {
        width: '100%',
        height: token.sizeXXL,
      },

      [`${componentCls}-input-icon`]: {
        color: token.colorTextQuaternary,
      },

      [`${componentCls}-content`]: {
        minHeight: 100,
      },

      [`${componentCls}-empty`]: {
        paddingBlock: token.paddingXL,
        textAlign: 'center',
        fontSize: token.fontSizeSM,
        color: token.colorTextTertiary,
      },

      [`${componentCls}-item`]: {
        display: 'flex',
        height: 56,
        marginBlockEnd: token.marginXXS,
        paddingInline: token.paddingXS,
        cursor: 'pointer',
        alignItems: 'center',
        borderRadius: token.borderRadius,
        border: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,
        backgroundColor: token.colorFillTertiary,

        '&.is-active': {
          color: token.colorWhite,
          backgroundColor: token.colorPrimary,
        },
      },

      [`${componentCls}-enter`]: {
        marginInlineStart: 'auto',
      },

      [`${componentCls}-footer`]: {
        display: 'flex',
        alignItems: 'center',
        columnGap: token.size,
        borderBottomLeftRadius: 'inherit',
        borderBottomRightRadius: 'inherit',
        fontSize: token.fontSizeSM,
        color: token.colorTextSecondary,
      },

      [`${componentCls}-footer-text`]: {
        marginInlineStart: token.marginXXS,
      },
    },
  };
});
