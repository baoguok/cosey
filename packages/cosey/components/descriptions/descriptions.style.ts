import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoDescriptions', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {
      borderCollapse: 'collapse',

      tr: {
        background: 'transparent',
      },
      td: {
        '&:nth-child(2n-1)': {
          color: token.colorTextTertiary,
        },
      },

      '&.is-label-left': {
        td: {
          '&:nth-child(2n-1)': {
            textAlign: 'left',
          },
        },
      },

      '&.is-label-center': {
        td: {
          '&:nth-child(2n-1)': {
            textAlign: 'center',
          },
        },
      },

      '&.is-label-right': {
        td: {
          '&:nth-child(2n-1)': {
            textAlign: 'right',
          },
        },
      },

      '&:not(.is-bordered)': {
        td: {
          '&:nth-child(2n)': {
            paddingInlineStart: token.paddingXS,
          },
          '&:nth-child(2n-1)': {
            '&:not(:first-child)': {
              paddingInlineStart: token.paddingSM,
            },
          },
        },
      },

      '&.is-bordered': {
        td: {
          border: `1px solid ${token.colorBorderSecondary}`,
          paddingBlock: token.paddingXXS,
          paddingInline: token.paddingXS,
        },
      },

      '&.has-colon': {
        td: {
          '&:nth-child(2n-1)': {
            'span::after': {
              content: '": "',
            },
          },
        },
      },
    },
  };
});
