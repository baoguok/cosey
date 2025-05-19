import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface FormToken extends FullToken<'Form'> {
  formItemCls: string;
}

const getFormStyle: GenerateStyle<FormToken, CSSObject> = (token) => {
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

export default getStyleHook('Form', (token) => {
  const formToken: FormToken = {
    ...token,
    formItemCls: `${token.componentCls}-item`,
  };

  return [getFormStyle(formToken), getFormItemStyle(formToken)];
});
