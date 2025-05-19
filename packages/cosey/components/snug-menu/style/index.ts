import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface SnugMenuToken extends FullToken<'SnugMenu'> {}

const getSnugMenuItemStyle: GenerateStyle<SnugMenuToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-item`]: {
      display: 'flex',
      cursor: 'pointer',
      justifyContent: 'center',
      alignItems: 'center',
      gap: token.sizeXS,
      borderRadius: token.borderRadiusLG,
      transition: token.motionDurationMid,

      '&.is-vertical': {
        flexDirection: 'column',
        paddingBlock: token.paddingSM,

        [`${componentCls}-item-title`]: {
          fontSize: token.fontSize,
        },
      },
      '&.is-horizontal': {
        paddingInline: token.paddingSM,
        height: 38,
      },
      '&.is-active': {
        color: token.colorPrimary,
      },
      '&.is-disabled': {
        cursor: 'not-allowed',
        opacity: 0.25,
      },
      [`${componentCls}-item-title`]: {
        fontSize: token.fontSize,
        whiteSpace: 'nowrap',
      },
      [`${componentCls}-item-icon`]: {
        transition: `transform ${token.motionDurationMid}`,
      },
      '&:not(.is-disabled):hover': {
        background: token.colorBgTextHover,
        [`${componentCls}-item-icon`]: {
          transform: 'scale(1.15)',
        },
      },
    },
  };
};

const getSnugMenuStyle: GenerateStyle<SnugMenuToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',

      '&.is-vertical': {
        flexDirection: 'column',
      },

      ...getSnugMenuItemStyle(token),
    },
  };
};

export default getStyleHook('SnugMenu', (token) => {
  return [getSnugMenuStyle(token)];
});
