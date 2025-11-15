import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('CoEditorV2Link', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      alignItems: 'center',

      [`${componentCls}-icon`]: {
        marginInlineEnd: token.marginXXS,
        fontSize: token.fontSizeLG,
      },
    },
  };
});
