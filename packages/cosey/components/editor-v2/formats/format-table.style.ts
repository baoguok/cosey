import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('CoEditorV2FormatTable', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-grid`]: {
        display: 'flex',
        flexDirection: 'column',
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
      },

      [`${componentCls}-row`]: {
        display: 'flex',

        '&:first-child': {
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit',

          [`${componentCls}-cell`]: {
            '&:first-child': {
              borderTopLeftRadius: 'inherit',
            },
            '&:last-child': {
              borderTopRightRadius: 'inherit',
            },
          },
        },
      },

      [`${componentCls}-cell`]: {
        width: token.size,
        height: token.size,

        borderBlockEnd: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,

        '&:not(:last-child)': {
          borderInlineEnd: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,
        },

        '&.is-selected': {
          backgroundColor: token.colorPrimary,
        },
      },

      [`${componentCls}-count`]: {
        paddingInline: token.paddingXXS,
        textAlign: 'center',
        lineHeight: token.lineHeightSM,
      },
    },
  };
});
