import { getSimpleStyleHook } from '../../../theme';

export default getSimpleStyleHook('EditorListPicker', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-item`]: {
        paddingBlock: token.paddingXXS,
        paddingInline: token.paddingSM,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        borderRadius: token.borderRadiusSM,
        cursor: 'pointer',

        '&:hover': {
          backgroundColor: token.colorFillTertiary,
        },

        '&.is-active': {
          backgroundColor: token.colorPrimaryBg,
        },
      },
    },
  };
});
