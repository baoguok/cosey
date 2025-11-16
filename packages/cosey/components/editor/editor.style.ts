import type { CSSInterpolation, CSSObject } from '../cssinjs';
import { getTruncateStyle } from '../style';
import { type GenerateStyle, getSimpleStyleHook } from '../theme';
import { AliasTokenWithCommonCls } from '../theme/getSimpleStyleHook';

export const getButtonStyle: GenerateStyle<AliasTokenWithCommonCls, CSSObject> = (token) => {
  const { componentCls } = token;

  const buttonCls = `${componentCls}-button`;

  return {
    [buttonCls]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 28,
      height: 28,
      flex: 'none',
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

      '&:focus-visible': {
        outline: `2px solid ${token.colorPrimaryHover}`,
        outlineOffset: 1,
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

export const getArticleStyle: GenerateStyle<AliasTokenWithCommonCls, CSSObject> = (token) => {
  return {
    'p, ol, ul, pre, blockquote, h1, h2, h3, h4, h5, h6, table': {
      margin: 0,
      padding: 0,
      marginBlock: token.marginSM,
    },

    'h1, h2, h3, h4, h5, h6': {
      fontWeight: token.fontWeightStrong,
    },

    h1: {
      fontSize: token.fontSizeHeading1,
    },
    h2: {
      fontSize: token.fontSizeHeading2,
    },
    h3: {
      fontSize: token.fontSizeHeading3,
    },
    h4: {
      fontSize: token.fontSizeHeading4,
    },
    h5: {
      fontSize: token.fontSizeHeading5,
    },
    h6: {
      fontSize: token.fontSizeHeading6,
    },

    table: {
      borderCollapse: 'collapse',
      tableLayout: 'fixed',
      width: '100%',

      td: {
        outline: 'none',
        border: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
        paddingInline: token.paddingXS,
        paddingBlock: token.paddingXXS,
      },

      thead: {
        'td,th': {
          backgroundColor: token.colorBgTextHover,
        },
      },
    },

    a: {
      color: token.colorLink,
      textDecoration: token.linkDecoration,

      '&:hover': {
        color: token.colorLinkHover,
        textDecoration: token.linkHoverDecoration,
      },
      '&:active': {
        color: token.colorLinkActive,
      },
      '&:focus': {
        textDecoration: token.linkFocusDecoration,
      },
    },

    img: {
      display: 'inline-block',
      maxWidth: '100%',
    },

    blockquote: {
      borderLeft: `4px solid ${token.colorBorder}`,
      paddingLeft: 16,
    },

    code: {
      fontSize: '85%',
      paddingBlock: 2,
      paddingInline: 4,
      borderRadius: token.borderRadiusSM,
      backgroundColor: '#f0f0f0',
    },

    kbd: {
      padding: `2px 6px`,
      fontSize: '.875em',
      color: token.colorText,
      backgroundColor: token.colorBgContainer,
      border: `${token.lineType} ${token.lineWidth} ${token.colorBorder}`,
      borderRadius: token.borderRadiusXS,
      boxShadow: `0 2px 0 -1px ${token.colorBgContainer}, 0 2px ${token.colorBorder}`,
    },

    pre: {
      position: 'relative',
      overflow: 'hidden',

      select: {
        position: 'absolute',
        right: token.sizeXXS,
        top: token.sizeXXS,
        zIndex: 1,
      },

      '> div': {
        padding: '1rem',
        overflow: 'auto',
      },
    },
  };
};

const getEditorStyle: GenerateStyle<AliasTokenWithCommonCls, CSSInterpolation> = (token) => {
  const { componentCls } = token;

  const toolbarCls = `${componentCls}-toolbar`;
  const containerCls = `${componentCls}-container`;
  const wrapperCls = `${componentCls}-wrapper`;
  const contentCls = `${componentCls}-content`;

  return {
    [componentCls]: {
      position: 'relative',
      lineHeight: token.lineHeight,
      borderRadius: token.borderRadius,
      border: `1px solid ${token.colorBorder}`,

      [toolbarCls]: {
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: token.sizeLG,
        rowGap: token.sizeXXS,
        paddingInline: token.paddingSM,
        paddingBlock: token.paddingXS,
        borderBottom: `1px solid ${token.colorBorder}`,
      },

      [containerCls]: {
        position: 'relative',

        '&.is-focus::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          border: `2px solid ${token.colorPrimaryHover}`,
          borderRadius: token.borderRadius,
          pointerEvents: 'none',
        },
      },

      [wrapperCls]: {
        overflow: 'auto',
      },

      '&.is-error': {
        [`&, ${toolbarCls}`]: {
          borderColor: token.colorError,
        },
      },

      [contentCls]: {
        minHeight: '100% !important',
        padding: token.paddingSM,
        borderRadius: token.borderRadius,
        fontSize: token.fontSize,
        outline: 'none',

        ...getArticleStyle(token),
      },

      '&.is-disabled': {
        [contentCls]: {
          backgroundColor: token.colorBgContainerDisabled,
          color: token.colorTextDisabled,
          cursor: 'not-allowed',
        },
      },
    },
  };
};

export default getSimpleStyleHook('CoEditor', (token) => {
  return [getEditorStyle(token), getButtonStyle(token)];
});
