import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoFormList', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-title`]: {
        color: token.colorTextLabel,

        '&.is-required': {
          '&::before': {
            marginInlineEnd: token.marginXXS,
            color: token.colorErrorText,
            content: '"*"',
          },
        },
      },
      [`${componentCls}-content`]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        rowGap: token.size,
      },
      [`${componentCls}-plus-icon`]: {
        marginInlineEnd: token.marginXXS,
      },

      '.el-form-item__label': {
        display: 'none',
      },
    },
  };
});
