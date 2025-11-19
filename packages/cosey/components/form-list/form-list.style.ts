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
        '@media(max-width: 768px)': {
          '&': {
            display: 'inline-flex',
          },
        },
      },

      [`${componentCls}-sort-item`]: {
        '@media(max-width: 768px)': {
          '&': {
            width: '100%',
          },
        },
      },

      [`${componentCls}-space`]: {
        display: 'flex',
        flexWrap: 'wrap',

        '&.is-head': {
          '@media(max-width: 768px)': {
            '&': {
              display: 'none',
            },
          },
        },

        '& > *': {
          maxWidth: '100%',

          '@media(max-width: 768px)': {
            '&': {
              width: '100%',
            },
          },
        },
      },
    },
  };
});
