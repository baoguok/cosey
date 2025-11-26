import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoRemoteSelect', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-popper`]: {
      display: 'flex',
      flexDirection: 'column',
      height: 320,

      '&.el-select-dropdown': {
        height: '100%',
      },

      [`${componentCls}-form`]: {
        '.el-form-item': {
          marginBottom: 0,
          marginRight: 16,

          '&:last-child': {
            marginRight: 0,
          },
        },
      },

      '.el-scrollbar': {
        flex: 1,
      },
      '.el-select-dropdown__empty': {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  };
});
