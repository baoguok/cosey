import { getSimpleStyleHook } from '../../theme';
import { getTruncateStyle } from '../../style/mixins';

export default getSimpleStyleHook('CoTableColumnEditor', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flexDirection: 'column',

      [`${componentCls}-header`]: {
        display: 'flex',
        paddingInline: token.paddingSM,
        paddingBlock: token.paddingXS,
        borderBlockEnd: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
      },

      [`${componentCls}-body`]: {
        paddingInline: token.paddingSM,
        paddingBlock: token.paddingXS,
      },

      [`${componentCls}-footer`]: {
        display: 'flex',
        paddingInline: token.paddingSM,
        paddingBlock: token.paddingXS,
        borderBlockStart: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
      },

      [`${componentCls}-list`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: token.sizeXXS,

        [`${componentCls}-list`]: {
          marginInlineStart: token.marginLG,
        },
      },

      [`${componentCls}-item`]: {
        position: 'relative',
        maxWidth: '100%',

        '&.is-pressing': {
          backgroundColor: token.colorBgElevated,
          boxShadow: token.boxShadowSecondary,
          opacity: 0.8,
        },
      },

      [`${componentCls}-item-content`]: {
        display: 'flex',
        alignItems: 'center',
        gap: token.sizeXS,
      },

      [`${componentCls}-item-holder`]: {
        width: token.size,
        flex: 'none',
        color: token.colorTextSecondary,
        cursor: 'grab',

        '&:active': {
          cursor: 'grabbing',
        },
      },

      [`${componentCls}-item-label`]: {
        flex: 1,
        minWidth: 0,
        ...getTruncateStyle(),
      },

      [`${componentCls}-item-pins`]: {
        display: 'flex',
        flex: 'none',
        marginInlineStart: 'auto',
        gap: token.sizeXS,
      },
    },
  };
});
