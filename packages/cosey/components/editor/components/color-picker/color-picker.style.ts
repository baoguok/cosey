import { getSimpleStyleHook } from '../../../theme';

export default getSimpleStyleHook('CoEditorColorPicker', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-title`]: {
        marginBlockEnd: token.marginXS,
        color: token.colorTextSecondary,

        [`& ~ ${componentCls}-title`]: {
          marginBlockStart: token.marginMD,
        },
      },

      [`${componentCls}-preset`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: token.sizeXXS,
      },

      [`${componentCls}-row`]: {
        display: 'flex',
        gap: token.sizeXXS,
      },

      [`${componentCls}-item`]: {
        display: 'flex',
      },

      [`${componentCls}-manual`]: {
        display: 'flex',
        gap: token.sizeXXS,
      },

      [`${componentCls}-btn`]: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        flex: 'none',
        borderRadius: token.borderRadiusSM,
        cursor: 'default',

        '&:not(.is-empty)': {
          cursor: 'pointer',
        },

        '&:not(.is-empty):hover': {
          outline: `2px solid ${token.colorPrimaryBorder}`,
        },

        [`&:not(${componentCls}-color):not(.is-empty):hover`]: {
          backgroundColor: token.colorPrimaryBg,
        },
      },

      [`${componentCls}-color`]: {
        border: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,

        '&.is-empty': {
          borderColor: token.colorBorderSecondary,
        },
      },

      [`${componentCls}-input`]: {
        width: 0,
        flex: 1,
        height: 20,
        lineHeight: '20px',
      },

      [`${componentCls}-clear`]: {
        color: token.colorError,
      },
    },
  };
});
