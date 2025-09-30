import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('CoTableStats', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flexWrap: 'wrap',
      columnGap: token.sizeXXL,
      alignItems: 'center',

      [`${componentCls}-column`]: {
        display: 'flex',
        alignItems: 'center',
      },

      [`${componentCls}-label`]: {
        fontSize: token.fontSize,
        color: token.colorTextTertiary,
      },

      [`${componentCls}-colon`]: {
        fontSize: token.fontSize,
        color: token.colorTextTertiary,
        marginInlineStart: token.marginXXS,
        marginInlineEnd: token.marginXS,
      },

      [`${componentCls}-value`]: {
        fontSize: token.fontSize,
        color: token.colorText,
      },
    },
  };
});
