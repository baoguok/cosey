import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('CoLayoutBrand', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: token.sizeXS,

      '&.is-horizontal': {
        minWidth: 220,
        justifyContent: 'flex-start',
        paddingInline: token.paddingSM,
      },

      [`${componentCls}-logo`]: {
        height: 'auto',
        width: 24,
        objectFit: 'contain',
      },

      [`${componentCls}-name`]: {
        fontSize: token.fontSizeLG,
        fontWeight: token.fontWeightStrong,
        whiteSpace: 'nowrap',
      },
    },
  };
});
