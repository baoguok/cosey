import { type CSSObject } from '../../cssinjs';
import { type GenerateStyle, getSimpleStyleHook } from '../../theme';
import { type AliasTokenWithCommonCls } from '../../theme/getSimpleStyleHook';

const getSnugMenuItemStyle: GenerateStyle<AliasTokenWithCommonCls, CSSObject> = (token) => {
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

export default getSimpleStyleHook('CoSnugMenu', (token) => {
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
});
