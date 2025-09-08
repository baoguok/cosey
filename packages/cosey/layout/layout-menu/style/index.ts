import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('CoLayoutMenu', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      width: '100%',
      borderInlineEnd: '0 !important',
      borderBlockEnd: '0 !important',

      '&.is-horizontal': {
        height: '100%',
      },
    },

    [`${componentCls}-icon`]: {
      marginInlineEnd: token.marginXXS,
      width: 'var(--el-menu-icon-width)',
      flex: 'none',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontSize: 18,
    },
  };
});
