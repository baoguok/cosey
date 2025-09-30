import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoFormQuery', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-form-item-buttons`]: {
        marginInlineStart: 'auto',
        alignSelf: 'flex-end',

        '.el-form-item__label': {
          display: 'none',
        },
      },

      [`${componentCls}-buttons`]: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',

        '&.is-inline': {
          justifyContent: 'flex-start',
        },
      },
    },
  };
});
