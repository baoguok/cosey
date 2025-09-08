import { type CSSObject } from '../cssinjs';
import { type GenerateStyle, getSimpleStyleHook } from '../theme';
import { getTruncateStyle } from '../style/mixins';
import { type AliasTokenWithCommonCls } from '../theme/getSimpleStyleHook';

export const getContextMenuContentStyle: GenerateStyle<AliasTokenWithCommonCls, CSSObject> = (
  token,
) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-content`]: {
      display: 'flex',
      position: 'relative',
      cursor: 'pointer',
      alignItems: 'center',
      paddingInline: token.padding,
      paddingBlock: token.paddingXXS,
      lineHeight: token.lineHeight,
      color: token.colorText,
      outline: 'none',

      '&:is(:hover, .is-hover):not(.is-disabled)': {
        color: token.colorPrimary,
        backgroundColor: token.colorBgTextHover,
      },

      '&.is-disabled': {
        cursor: 'not-allowed',
        color: token.colorTextDisabled,
      },

      '&-icon': {
        marginInlineEnd: token.marginXS,
        width: token.size,
        fontSize: token.fontSizeLG,
      },

      '&-title': {
        minWidth: 0,
        flex: 1,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        ...getTruncateStyle(),
      },

      '&-arrow': {
        display: 'flex',
        alignItems: 'center',
        marginInlineStart: 'auto',
      },

      '&-arrow-icon': {
        marginInlineStart: token.marginLG,
      },
    },
  };
};

const getCommonPanelStyle: GenerateStyle<AliasTokenWithCommonCls, CSSObject> = (token) => {
  const { componentCls } = token;
  return {
    position: 'fixed',
    insetInlineStart: 0,
    insetBlockStart: 0,
    paddingBlock: token.paddingXXS,
    border: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadius,
    backgroundColor: token.colorBgElevated,
    boxShadow: token.boxShadowSecondary,

    [`${componentCls}-divider`]: {
      marginBlock: token.marginXXS,
      borderBlockStart: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,
    },
  };
};

export default getSimpleStyleHook('CoContextMenu', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...getCommonPanelStyle(token),
      ...getContextMenuContentStyle(token),
    },

    [`${componentCls}-mask`]: {
      position: 'fixed',
      inset: 0,
    },

    [`${componentCls}-point`]: {
      position: 'fixed',
      width: 0,
      height: 0,
    },

    [`${componentCls}-submenu`]: {
      ...getCommonPanelStyle(token),
      ...getContextMenuContentStyle(token),
    },
  };
});
