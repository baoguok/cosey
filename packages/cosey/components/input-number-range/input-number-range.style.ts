import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoInputNumberRange', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {
      display: 'flex',
      width: '100%',
      paddingInline: 10,
      verticalAlign: 'middle',

      '&:hover': {
        boxShadow: `0 0 0 1px var(--el-border-color-hover) inset`,
      },

      '&.is-focus': {
        boxShadow: `0 0 0 1px ${token.colorPrimary} inset`,
      },

      [`${componentCls}-start,${componentCls}-end`]: {
        display: 'flex',
        flex: 1,
        '.el-input__wrapper': {
          boxShadow: 'none !important',
        },
      },

      [`${componentCls}-separator`]: {
        flex: 'none',
        height: '100%',
        paddingInline: token.paddingXS,
      },

      '.el-input-number': {
        width: 0,
        flex: 1,

        '&.is-without-controls .el-input__wrapper': {
          padding: 0,
        },
      },
    },
  };
});
