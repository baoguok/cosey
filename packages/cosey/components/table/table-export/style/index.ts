import { getSimpleStyleHook } from '../../../theme';

export default getSimpleStyleHook('CoTableExport', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: token.colorBgContainer,

      [`${componentCls}-list`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: token.sizeXXS,

        [`${componentCls}-list`]: {
          marginInlineStart: token.marginLG,
        },
      },

      [`${componentCls}-list-item`]: {
        display: 'flex',
        alignItems: 'center',
      },
    },
  };
});
