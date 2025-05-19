import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('LayoutChangePassword', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-title`]: {
        marginBlockEnd: token.marginXL,
        textAlign: 'center',
        fontSize: token.fontSizeHeading2,
        lineHeight: token.lineHeightHeading2,
        fontWeight: token.fontWeightStrong,
      },

      [`${componentCls}-icon`]: {
        color: token.colorTextSecondary,
      },

      [`${componentCls}-button`]: {
        width: '100%',
      },
    },
  };
});
