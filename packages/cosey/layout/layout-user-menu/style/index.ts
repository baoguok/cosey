import { getSimpleStyleHook, getTruncateStyle } from '../../../components';

export default getSimpleStyleHook('LayoutUserMenu', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: token.borderRadius,
      cursor: 'pointer',

      '&:focus-visible': {
        outline: 'none',
      },

      [`${componentCls}-name`]: {
        marginInlineStart: token.marginXS,
        maxWidth: 160,
        ...getTruncateStyle(),
      },
    },

    [`${componentCls}-dropdown`]: {
      minWidth: 140,
    },

    [`${componentCls}-item-title`]: {
      marginInlineStart: token.marginXS,
    },
  };
});
