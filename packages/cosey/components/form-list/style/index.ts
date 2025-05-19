import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface FormListToken extends FullToken<'FormList'> {}

const getFormListStyle: GenerateStyle<FormListToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-title`]: {
        color: token.colorTextLabel,

        '&.is-required': {
          '&::before': {
            marginInlineEnd: token.marginXXS,
            color: token.colorErrorText,
            content: '"*"',
          },
        },
      },
      [`${componentCls}-content`]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        rowGap: token.size,
      },
      [`${componentCls}-plus-icon`]: {
        marginInlineEnd: token.marginXXS,
      },

      '.el-form-item__label': {
        display: 'none',
      },
    },
  };
};

export default getStyleHook('FormList', (token) => {
  return [getFormListStyle(token)];
});
