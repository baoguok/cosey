import { type CSSObject } from '../cssinjs';
import { type GenerateStyle, getSimpleStyleHook } from '../theme';
import { type AliasTokenWithCommonCls } from '../theme/getSimpleStyleHook';

interface FormToken extends AliasTokenWithCommonCls {
  formItemCls: string;
}

const getFormStyle: GenerateStyle<AliasTokenWithCommonCls, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-form-item-buttons`]: {
        '.el-form-item--label-top .el-form-item__label': {
          display: 'none',
        },
      },
    },
  };
};

const getFormItemStyle: GenerateStyle<FormToken, CSSObject> = (token) => {
  const { formItemCls } = token;

  return {
    [formItemCls]: {
      minWidth: 0,

      [`${formItemCls}-label-icon`]: {
        marginInlineStart: token.marginXXS,
        cursor: 'pointer',
        alignSelf: 'center',
      },

      [`${formItemCls}-content`]: {
        maxWidth: '100%',

        '@media(max-width: 768px)': {
          '&': {
            width: '100% !important',
          },
        },
      },

      [`${formItemCls}-extra`]: {
        marginBlockStart: token.marginXXS,
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeight,
        color: token.colorTextSecondary,
      },
    },
  };
};

export default getSimpleStyleHook('CoForm', (token) => {
  const formToken: FormToken = {
    ...token,
    formItemCls: `${token.componentCls}-item`,
  };

  return [getFormStyle(formToken), getFormItemStyle(formToken)];
});
