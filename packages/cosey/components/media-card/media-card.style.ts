import { type CSSObject } from '../cssinjs';
import { type GenerateStyle } from '../theme';
import { getLineClampStyle } from '../style/mixins';
import { type AliasToken, type TokenWithCommonCls } from '../theme';

export interface ComponentToken {}

export const getMediaCardStyle: GenerateStyle<AliasToken, CSSObject> = (token) => {
  return {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
    borderRadius: token.borderRadiusLG,
    overflow: 'hidden',

    '&.is-mini': {
      width: 48,
      height: 48,
      fontSize: 12,
      borderRadius: token.borderRadiusSM,
    },

    '&.is-small': {
      width: 64,
      height: 64,
      fontSize: 18,
      borderRadius: token.borderRadius,
    },

    '&.is-middle': {
      width: 80,
      height: 80,
      fontSize: 24,
    },

    '&.is-large': {
      width: 96,
      height: 96,
      fontSize: 24,
    },
  };
};

export const getMediaCardFileNameStyle: GenerateStyle<TokenWithCommonCls<AliasToken>, CSSObject> = (
  token,
) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-filename`]: {
      width: '100%',
      height: `calc(2em * ${1.12})`,
      paddingInline: token.paddingXXS,
      marginBlockStart: token.marginXXS,
      wordBreak: 'break-all',
      fontSize: token.fontSizeSM,
      lineHeight: 1.12,
      textAlign: 'center',
      ...getLineClampStyle(2),
      WebkitAlignContent: 'center',
    },

    '&:is(.is-mini, .is-small)': {
      [`${componentCls}-filename`]: {
        height: 'auto',
        ...getLineClampStyle(1),
      },
    },

    '.is-middle': {
      justifyContent: 'flex-start',
      paddingBlockStart: token.fontSizeLG,
    },

    '.is-large': {
      justifyContent: 'flex-start',
      paddingBlockStart: token.fontSizeXL,
    },
  };
};

export const getMediaCardFileTypeStyle: GenerateStyle<TokenWithCommonCls<AliasToken>, CSSObject> = (
  token,
) => {
  const { componentCls } = token;
  return {
    [`${componentCls}-type`]: {
      fontSize: '0.8em',
      lineHeight: 1.12,
      textAlign: 'center',
      color: token.colorPrimary,
    },
  };
};
