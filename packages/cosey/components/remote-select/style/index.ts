import { getSimpleStyleHook } from 'cosey/components';

export default getSimpleStyleHook('RemoteSelect', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {},

    [`${componentCls}-popper`]: {
      display: 'flex',
      flexDirection: 'column',
      height: 320,

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
