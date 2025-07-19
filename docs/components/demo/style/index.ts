import { getSimpleStyleHook } from 'cosey/components';

export default getSimpleStyleHook('DocsDemo', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      marginBlock: token.margin,
      borderRadius: token.borderRadius,
      border: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
      backgroundColor: token.colorBgContainer,

      [`${componentCls}-display`]: {
        overflow: 'auto',
        padding: token.padding,
      },

      [`${componentCls}-toolbar`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: token.sizeXXL,
        paddingInline: token.padding,
        paddingBlock: token.paddingXS,
        borderBlockStart: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
      },

      [`${componentCls}-code`]: {
        'div[class*="language-"]': {
          margin: 0,
          borderRadius: 0,
        },
      },

      [`${componentCls}-fold`]: {
        position: 'sticky',
        insetInline: 0,
        insetBlockEnd: 0,
        zIndex: 10,
        overflow: 'hidden',
        borderBottomLeftRadius: 'inherit',
        borderBottomRightRadius: 'inherit',
        borderBlockStart: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
        backgroundColor: token.colorBgContainer,
        marginInlineStart: 1,

        '&-button': {
          width: '100%',
          paddingBlock: token.paddingSM,
        },

        '&-text': {
          marginInlineStart: token.marginXXS,
        },
      },
    },
  };
});
