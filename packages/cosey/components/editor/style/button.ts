import type { CSSObject } from '../../cssinjs';
import type { GenerateStyle } from '../../theme';
import type { EditorToken } from '.';
import { getTruncateStyle } from '../../style/mixins';

export const getEditorButtonStyle: GenerateStyle<EditorToken, CSSObject> = (token) => {
  const { componentCls } = token;

  const buttonCls = `${componentCls}-button`;

  return {
    [buttonCls]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 28,
      height: 28,
      fontSize: 20,
      whiteSpace: 'nowrap',
      borderRadius: token.borderRadiusSM,
      border: `${token.lineWidth} ${token.lineType} transparent`,
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: token.colorFillSecondary,
      },

      '&:active, &.is-active': {
        backgroundColor: token.colorPrimaryBg,
      },

      '&-group': {
        display: 'flex',
        gap: 2,
      },

      '&-select': {
        width: 130,
        justifyContent: 'space-between',
        paddingInline: token.paddingXS,
        fontSize: token.fontSize,
        backgroundColor: token.colorFillTertiary,
      },

      '&-chevron': {
        width: 16,
      },

      '&-text': {
        ...getTruncateStyle(),
      },

      '&-arrow': {
        flex: 'none',
      },

      '&-split': {
        display: 'flex',
        borderRadius: token.borderRadiusSM,
        border: `${token.lineWidth} ${token.lineType} transparent`,

        '&.is-active, &:hover': {
          borderColor: token.colorBorderSecondary,
        },

        [`${buttonCls}-button`]: {
          border: 'none',
          borderRadius: `calc(${token.borderRadiusSM}px - 1px)`,

          '&:not(:first-child)': {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
          '&:not(:last-child)': {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      },
    },
  };
};
